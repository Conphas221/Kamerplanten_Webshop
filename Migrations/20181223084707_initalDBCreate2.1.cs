using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace kamerplantModel.Migrations
{
    public partial class initalDBCreate21 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "bestelling",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    klantID = table.Column<int>(nullable: false),
                    geregistreerd = table.Column<bool>(nullable: false),
                    prijs = table.Column<double>(nullable: false),
                    datum = table.Column<string>(nullable: true),
                    adres = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bestelling", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "categorie",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    naam = table.Column<string>(nullable: true),
                    beschrijving = table.Column<string>(nullable: true),
                    foto = table.Column<string>(nullable: true),
                    url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_categorie", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "geregistreerdeklant",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    naam = table.Column<string>(nullable: true),
                    admin = table.Column<bool>(nullable: false),
                    email = table.Column<string>(nullable: true),
                    wachtwoord = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_geregistreerdeklant", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "klant",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    naam = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_klant", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "sessie",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    geregistreerdeklantID = table.Column<int>(nullable: false),
                    actief = table.Column<bool>(nullable: false),
                    intijd = table.Column<string>(nullable: true),
                    uittijd = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sessie", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "product",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    naam = table.Column<string>(nullable: true),
                    prijs = table.Column<double>(nullable: false),
                    beschrijving = table.Column<string>(nullable: true),
                    foto = table.Column<string>(nullable: true),
                    voorraad = table.Column<int>(nullable: false),
                    categorieID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_product", x => x.ID);
                    table.ForeignKey(
                        name: "FK_product_categorie_categorieID",
                        column: x => x.categorieID,
                        principalTable: "categorie",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "bestellingproduct",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    productID = table.Column<int>(nullable: false),
                    bestellingID = table.Column<int>(nullable: false),
                    verkoopPrijs = table.Column<double>(nullable: false),
                    geregistreerdeklantID = table.Column<int>(nullable: true),
                    klantID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bestellingproduct", x => x.ID);
                    table.ForeignKey(
                        name: "FK_bestellingproduct_bestelling_bestellingID",
                        column: x => x.bestellingID,
                        principalTable: "bestelling",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_bestellingproduct_geregistreerdeklant_geregistreerdeklantID",
                        column: x => x.geregistreerdeklantID,
                        principalTable: "geregistreerdeklant",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_bestellingproduct_klant_klantID",
                        column: x => x.klantID,
                        principalTable: "klant",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_bestellingproduct_product_productID",
                        column: x => x.productID,
                        principalTable: "product",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "verlanglijstitem",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    productID = table.Column<int>(nullable: false),
                    geregistreerdeklantID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_verlanglijstitem", x => x.ID);
                    table.ForeignKey(
                        name: "FK_verlanglijstitem_geregistreerdeklant_geregistreerdeklantID",
                        column: x => x.geregistreerdeklantID,
                        principalTable: "geregistreerdeklant",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_verlanglijstitem_product_productID",
                        column: x => x.productID,
                        principalTable: "product",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_bestellingproduct_bestellingID",
                table: "bestellingproduct",
                column: "bestellingID");

            migrationBuilder.CreateIndex(
                name: "IX_bestellingproduct_geregistreerdeklantID",
                table: "bestellingproduct",
                column: "geregistreerdeklantID");

            migrationBuilder.CreateIndex(
                name: "IX_bestellingproduct_klantID",
                table: "bestellingproduct",
                column: "klantID");

            migrationBuilder.CreateIndex(
                name: "IX_bestellingproduct_productID",
                table: "bestellingproduct",
                column: "productID");

            migrationBuilder.CreateIndex(
                name: "IX_product_categorieID",
                table: "product",
                column: "categorieID");

            migrationBuilder.CreateIndex(
                name: "IX_verlanglijstitem_geregistreerdeklantID",
                table: "verlanglijstitem",
                column: "geregistreerdeklantID");

            migrationBuilder.CreateIndex(
                name: "IX_verlanglijstitem_productID",
                table: "verlanglijstitem",
                column: "productID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "bestellingproduct");

            migrationBuilder.DropTable(
                name: "sessie");

            migrationBuilder.DropTable(
                name: "verlanglijstitem");

            migrationBuilder.DropTable(
                name: "bestelling");

            migrationBuilder.DropTable(
                name: "klant");

            migrationBuilder.DropTable(
                name: "geregistreerdeklant");

            migrationBuilder.DropTable(
                name: "product");

            migrationBuilder.DropTable(
                name: "categorie");
        }
    }
}
