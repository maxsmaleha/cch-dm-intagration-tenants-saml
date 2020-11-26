namespace WebApplication3.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeDataStructure : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ProjectDbModels",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        UserId = c.String(),
                        LineItems = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ProjectDbModels");
        }
    }
}
