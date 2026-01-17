import { useEffect, useState } from "react";
import api from "../../services/api";
import "../admin.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");

  const [isFeatured, setIsFeatured] = useState(false);
  const [featuredOrder, setFeaturedOrder] = useState(0);

  const [thumbnail, setThumbnail] = useState(null);
  const [shopThumb1, setShopThumb1] = useState(null);
  const [shopThumb2, setShopThumb2] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const [sizes, setSizes] = useState([]);
  const [deletedSizeIds, setDeletedSizeIds] = useState([]);

  const loadProducts = () => {
    api.get("/products").then(res => setProducts(res.data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setBrand("");
    setColor("");
    setIsFeatured(false);
    setFeaturedOrder(0);
    setThumbnail(null);
    setShopThumb1(null);
    setShopThumb2(null);
    setGalleryImages([]);
    setSizes([]);
    setDeletedSizeIds([]);
  };

  const handleEdit = async (id) => {
    const res = await api.get(`/products/${id}`);
    const p = res.data;

    setEditingId(p.id);
    setName(p.name);
    setDescription(p.description);
    setPrice(p.price);
    setCategory(p.category);
    setBrand(p.brand);
    setColor(p.color);
    setIsFeatured(p.isFeatured);
    setFeaturedOrder(p.featuredOrder);

    setSizes(
      p.sizes.map(s => ({
        id: s.id,
        size: s.sizeLabel,
        stock: s.stock
      }))
    );
  };

  const saveProduct = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("color", color);
    formData.append("isFeatured", isFeatured);
    formData.append("featuredOrder", featuredOrder);

    sizes.forEach((s, i) => {
      if (!s.size || s.stock === "") return;

      if (s.id) {
        formData.append(`Sizes[${i}].Id`, s.id);
      }

      formData.append(`Sizes[${i}].SizeLabel`, s.size);
      formData.append(`Sizes[${i}].Stock`, Number(s.stock));
    });

    deletedSizeIds.forEach((id, i) => {
      formData.append(`DeletedSizeIds[${i}]`, id);
    });

    if (thumbnail) formData.append("thumbnailUrl", thumbnail);
    if (shopThumb1) formData.append("shopThumbnailUrl1", shopThumb1);
    if (shopThumb2) formData.append("shopThumbnailUrl2", shopThumb2);

    galleryImages.forEach(img => formData.append("galleryImages", img));

    if (editingId) {
      await api.put(`/products/${editingId}`, formData);
    } else {
      await api.post("/products", formData);
    }
    resetForm();
    loadProducts();
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const updateSize = (index, field, value) => {
    const copy = [...sizes];
    copy[index][field] = value;
    setSizes(copy);
  };

  return (
    <div className="admin-card">
      <h1>Products</h1>

      {/* FORM */}
      <div className="admin-form">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} />
        <input placeholder="Color" value={color} onChange={e => setColor(e.target.value)} />

        <label>
          <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
          Featured
        </label>

        <input type="number" placeholder="Featured order" value={featuredOrder} onChange={e => setFeaturedOrder(e.target.value)} />

        {/* Sizes */}
        <h3>Sizes</h3>
        {sizes.map((s, i) => (
          <div key={s.id ?? i} className="row">
            <input
              placeholder="Size"
              value={s.size}
              onChange={e => updateSize(i, "size", e.target.value)}
            />

            <input
              type="number"
              placeholder="Stock"
              value={s.stock}
              onChange={e => updateSize(i, "stock", e.target.value)}
            />

            <button
              className="btn delete"
              onClick={() => {
                const s = sizes[i];

                if (s.id) {
                  setDeletedSizeIds(prev => [...prev, s.id]);
                }

                const copy = [...sizes];
                copy.splice(i, 1);
                setSizes(copy);
              }}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setSizes(prev => [...prev, { id: null, size: "", stock: "" }])
          }
        >
          + Size
        </button>

        {/* Images */}
        <label>Thumbnail</label>
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        {editingId && products.find(p => p.id === editingId)?.thumbnailUrl && !thumbnail && (
            <div className="preview-container">
                <span className="preview-label">Current Thumbnail</span>
                <img
                src={`https://localhost:7010${products.find(p => p.id === editingId).thumbnailUrl}`}
                className="thumbnail-preview"
                />
            </div>
        )}

        <label>Shop Thumbnail 1</label>
        <input type="file" onChange={e => setShopThumb1(e.target.files[0])} />
        {editingId && !shopThumb1 && products.find(p => p.id === editingId)?.shopThumbnailUrl1 && (
            <img
                src={`https://localhost:7010${products.find(p => p.id === editingId).shopThumbnailUrl1}`}
                className="thumbnail-preview"
            />
        )}

        <label>Shop Thumbnail 2</label>
        <input type="file" onChange={e => setShopThumb2(e.target.files[0])} />
        {editingId && !shopThumb2 && products.find(p => p.id === editingId)?.shopThumbnailUrl2 && (
            <img
                src={`https://localhost:7010${products.find(p => p.id === editingId).shopThumbnailUrl2}`}
                className="thumbnail-preview"
            />
        )}

        <label>Gallery</label>
        <input type="file" multiple onChange={e => setGalleryImages([...e.target.files])} />
        {editingId &&
            products.find(p => p.id === editingId)?.galleryImages?.length > 0 &&
            galleryImages.length === 0 && (
                <div className="gallery">
                {products
                    .find(p => p.id === editingId)
                    .galleryImages.map((img, i) => (
                    <img
                        key={i}
                        src={`https://localhost:7010${img}`}
                        className="thumbnail-preview"
                    />
                    ))}
                </div>
        )}
        {galleryImages.length > 0 && (
            <div className="gallery">
                {galleryImages.map((img, i) => (
                <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    className="thumbnail-preview"
                />
                ))}
            </div>
        )}

        <div className="form-actions">
          <button onClick={saveProduct}>{editingId ? "Save changes" : "Create product"}</button>
          {editingId && <button className="btn cancel" onClick={resetForm}>Cancel</button>}
        </div>
      </div>

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price} KM</td>
              <td>{p.isFeatured ? "✔" : "—"}</td>
              <td className="actions">
                <button className="btn edit" onClick={() => handleEdit(p.id)}>Edit</button>
                <button className="btn delete" onClick={() => deleteProduct(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
