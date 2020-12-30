Aurigma.DocketManagerService = class {

    _projectHandlers = [];

    _backofficeUrl = '';
    _tenantId = 0;
    _customerSignature = '';
    _shopName = '';
    _customerId = '';
    _product = {};
    _settings = {};
    constructor({ backofficeUrl, tenantId, customerId, customerSignature, shopName, product }) {
        this._backofficeUrl = backofficeUrl;
        this._tenantId = tenantId;
        this._customerId = customerId;
        this._customerSignature = customerSignature;
        this._shopName = shopName || "docket-manager";
        this._product = product;
        this._settings = {};
    }

    get backofficeUrl() { return this._backofficeUrl; }
    get tenantId() { return this._tenantId; }
    get domain() { return this._shopName; }
    get driverFilename() { return "default-driver.js"; }
    get customerAuth() { return { id: this.generateUserId(), signature: this._customerSignature }; }
    get productModel() { return this._product; }
    get quantity() {
        return this.getQuantity();
    }

    getSelectedVariantId = () => this
        .getVariantId()
        .map(value => Number(value))


    /**
     * Add function to handle project
     * @param {Function} func - function to handle project
     */
    addProjectHandler(func) {
        this._projectHandlers.push(func);
    }

    /**
     * Execute backoffice project handlers
     * @param {UIFrameworkEditor} editor - UIFramework editor definition
     */
    addEditorExitHandler(editor) {
        editor.driver.cart.onSubmitting.subscribe(async () => {

            editor.driver.orders.current.props['hidden']['pdfUrl'] =
                Aurigma.ensureEndsWith(this.backofficeUrl, "/") + "api/services/app/Project/GetProjectPdfUrl" +
                "?stateId=" + editor.driver.orders.current.props['stateId'] + "&userId=" + editor.driver.orders.current.props['userId'];
            const returnData = this.getBackToEditorData().orNull();
            const project = {
                productId: editor.driver.products.current.id,
                projectId: returnData != null ? returnData.key : null,
                userId: editor.driver.orders.current.props["userId"],
                lineItems: [
                    Object.assign({
                        key: Aurigma.Guid(),
                        quantity: editor.driver.orders.current.quantity
                    }, editor.driver.orders.current.props)
                ],
            };
            for (const func of this._projectHandlers) {
                await func(project);
            }
        });
    }

    /**
     * @returns {DefaultEditorSettings} editor settings
     */
    getPluginSettings() {
        return {
            language: new Aurigma.DocumentService(document).getLanguage(),
            customersCanvasUrl: this._settings.customersCanvasUrl || "",
            customersCanvasBaseUrl: this._settings.customersCanvasBaseUrl || ""
        };
    }

    /**
     * 
     * @param {DefaultEditorSettings} settings - settings object
     */
    updatePluginSettings(settings) {
        this._settings.customersCanvasBaseUrl = settings.customersCanvasBaseUrl;
        this._settings.customersCanvasUrl = settings.customersCanvasUrl;
    }

    getBackToEditorData = () => this.getBackToEditorDataFromQueryString();

    getProductId = () => this._product.id;

    getQuantity() {
        const control = document.getElementById("quantity-group");
        return control ? Number.parseInt(control.value) : 1;
    }

    getVariantId() {
        return Aurigma.Maybe.fromNull(null)
            .map(form => new window.FormData(form))
            .map(formdata => formdata.get("id"))
            .map(result => String(result));
    }

    /**
     * @returns {User} user info (userId, CC tokenId)
     */
    getUser() {
        return { id: this.generateUserId(), tokenId: '' };
    }

    getCurrentSessionId() {
        const doc = new Aurigma.DocumentService(document);
        const cookies = doc.getCookies();
        return `docket_${cookies["docket_manager_session_guid"] ||
            Aurigma.Guid()}`;
    }

    /**
     * 
     */
    generateUserId = () => Aurigma.Maybe
        .fromFalsy(this._customerId)
        .cata(
            /*none: */() => this.getCurrentSessionId(),
            /*some: */ customerId => this.buildCustomersCanvasUserId(this.domain, customerId)
        )

    /**
     * 
     * @param {string} shopDomain - shop domain
     * @param {string} customerId - ecommerce user ID or session id for anonymous users
     */
    buildCustomersCanvasUserId(shopDomain, customerId) {
        return `${(shopDomain ?? "").split(".")[0]}_${customerId}`;
    }

    /**
     * 
     */
    getBackToEditorDataFromQueryString() {
        const queryString = new URLSearchParams(window.location.search);
        return Aurigma.Maybe.of(queryString)
            .map(q => { return { key: q.get("key"), snapshot: q.get("snapshot") } })
            .flatMap(bte => bte.key !== null && bte.snapshot !== null ? Aurigma.Maybe.of(bte) : Aurigma.Maybe.Nothing());
    }
}