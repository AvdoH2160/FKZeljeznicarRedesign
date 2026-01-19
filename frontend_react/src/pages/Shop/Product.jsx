import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import {useCart} from "./context/CartContext";
import SizeTable from "./components/SizeTable/SizeTable"
import "./product.css";

const Product = () => {
  const { slug } = useParams();
  const {addToCart} = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("size");

  useEffect(() => {
    api.get(`/products/slug/${slug}`)
      .then(res => {
        setProduct(res.data);
        setMainImage(res.data.thumbnailUrl);
      })
      .catch(err => console.error(err));
  }, [slug]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;

    const selected = product.sizes.find(s => s.sizeLabel === selectedSize);
    addToCart(
      {
        ...product,
        image: product.thumbnailUrl,
        selectedSizeLabel: selected.sizeLabel,
        selectedSizeId: selected.id
      },
      selected.sizeLabel, 
      quantity
    );
  };

  if (!product) {
    return <div className="loading">Učitavanje proizvoda...</div>;
  }

  return (
    <div className="product-page">

      {/* GRID */}
      <div className="product-grid">

        {/* LIJEVA STRANA */}
        <div className="product-images">
          <div className="main-image">
            <img src={`https://localhost:7010${mainImage}`} alt={product.name} />
          </div>

          <div className="thumbnails">
            {product.galleryImages?.slice(0, 3).map((img, i) => (
              <img
                key={i}
                src={`https://localhost:7010${img}`}
                className={activeTab === img ? "active" : ""}
                onClick={() => setMainImage(img)}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* DESNA STRANA */}
        <div className="product-info">

          <h1>{product.name}</h1>
          <p className="price">{product.price} KM</p>

          {/* VELIČINA */}
          <div className="size-select">
            <label>Izaberi veličinu:</label>
            <select
              value={selectedSize}
              onChange={e => setSelectedSize(e.target.value)}
            >
              <option value="">Odaberi opciju</option>
              {product.sizes.map(size => (
                <option
                  key={size.id}
                  value={size.sizeLabel}
                  disabled={size.stock === 0}
                >
                  {size.sizeLabel}
                  {size.stock === 0 && " (Nema na stanju)"}
                </option>
              ))}
            </select>
          </div>

          {/* KOLIČINA */}
          <div className="quantity">
            <label>Izaberi količinu:</label>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          {/* ADD TO CART */}
          <button
            className="add-to-cart"
            disabled={!selectedSize}
            onClick={handleAddToCart}
          >
            Dodaj u korpu
          </button>

          {/* OPIS */}
          <div className="description">
            {product.description}
          </div>

        </div>
      </div>

      {/* TABOVI */}
      <div className="product-tabs">
        <button
          className={activeTab === "size" ? "active" : ""}
          onClick={() => setActiveTab("size")}
        >
          Veličina
        </button>
        <button
          className={activeTab === "delivery" ? "active" : ""}
          onClick={() => setActiveTab("delivery")}
        >
          Dostava
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="tab-content">
        {activeTab === "size" && (
           <SizeTable></SizeTable>
        )}
        {activeTab === "delivery" && (
          <>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>Naručivanje</h2>
            <p>
Kupac naručuje proizvod ili proizvode putem elektronskog obrasca narudžbe. Kupcem se smatra svaka osoba koja elektronski naruči barem jedan proizvod, popuni tražene podatke i pošalje narudžbu. Sve cijene izražene su u Konvertibilnim markama, s PDV-om. Roba se naručuje elektronskim oblikom, pritiskom na određeni proizvod te spremanjem istog u korpu. Roba se smatra naručenom u trenutku kada kupac odabere te potvrdi način plaćanja.
            </p>

            <h2 style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>Dostava</h2>
            <p>
Naručeni proizvodi pakiraju se na način da tokom uobičajene manipulacije ne budu oštećeni. Prilikom preuzimanja kupac je dužan provjeriti stanje pošiljke te u slučaju oštećenja odmah reklamirati proizvod dostavljaču. Ako kupac ne primi robu, ili obavijest o isporuci, nakon što je poslana, u očekivanom vremenu, kupac ima pravo o tome obavijestiti trgovca kako bi se poduzele radnje pronalaska pošiljke ili kako bi se poslala zamjenska pošiljka. Ako kupac odbije primiti robu koju je naručio, trgovac ima pravo tražiti od kupca nadoknadu svih troškova koji su vezani za isporuku. Trgovac se obavezuje poslati pošiljku kupcu onoga trenutka kada zaprimi potvrdu kojom se odobrava online transakcija.
            </p>

            <h2 style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>Reklamacija</h2>
            <p>
Proizvode iz shopa moguće je vratiti unutar roka od sedam dana od primitka, ukoliko ste na vašu adresu primili oštećen proizvod ili proizvod koji niste naručili.

Proizvode čija vam veličina ne odgovara ne mijenjamo jer su proizvodi standardnih dimenzija ili je u slučaju da nisu to naglašeno uz naznačenost linka za provjeru tačne dimenzije majica i dukserica. Prilikom povrata svi proizvodi moraju biti u originalnom stanju i pakovanju – nenošeni i neiskorišteni sa oznakama i etiketama originalnosti i u originalnoj neoštećenoj ambalaži.

U suprotnom proizvod ne može biti zamijenjen.

U slučaju da se proizvod vrati kao neuručen FK Željezničar d.o.o. šalje dva obavještenja unutar mjesec dana. Adresa koju kupac ponovo pošalje kao odgovor na jedno od ova dva obavještenja se uzima kao nova adresa primaoca. Ukoliko je ona u Bosni i Hercegovini proizvodi se šalju besplatno, a ukoliko je ona van Bosne i Hercegovine naručilac plaća poštarinu. U slučaju neodgovaranja na obavještenja u roku od 60 dana narudžba se briše i kupcu se vraća iznos plaćenih majica odbijen za troškove poštarine.

Dodatna pomoć:

Za sve upite vezano za vašu narudžbu, te posebne načine dostave i naplate, kontaktirajte nas na naš e-mail shop@fkzeljeznicar.ba
            </p>

            <h2 style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>Način plaćanja</h2>
            <p>
kreditne/debitne kartice putem internacionalnog servisa PikPay, prilikom preuzimanja, uplatnica

Sigurnost plaćanja kreditnim karticama

Tajnost Vaših podataka je zaštićena i osigurana upotrebom SSL enkripcije. Stranice za naplatu putem interneta osigurane su korištenjem Secure Socket Layer (SSL) protokola sa 128-bitnom enkripcijom podataka. SSL enkripcija je postupak šifriranja podataka radi sprječavanja neovlaštenog pristupa prilikom njegovog prijenosa. Time je omogućen siguran prijenos informacija te onemogućen nedozvoljen pristup podacima prilikom komunikacije između korisnikovog računala i PikPay servisa, te obratno. Trgovac ne pohranjuje brojeve kreditnih kartica i brojevi nisu dostupni neovlaštenim osobama.
            </p>

            <h2 style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>Izjava o privatnosti</h2>
            <p>
Obavezujemo se pružati zaštitu osobnim podacima kupaca, na način da prikupljamo samo nužne, osnovne podatke o kupcima / korisnicima koji su nužni za ispunjenje naših obaveza; informišemo kupce o načinu korištenja prikupljenih podataka. Svi se podaci o korisnicima strogo čuvaju i dostupni su samo trgovcima kojima su ti podaci neophodni za obavljanje posla. Svi naši uposlenici i poslovni partneri odgovorni su za poštivanje načela zaštite privatnosti.
            </p>
          </>
        )}
      </div>

    </div>
  );
};

export default Product;
