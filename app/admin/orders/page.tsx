"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type OrderItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

type Order = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders/all");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      setUpdatingId(id);

      const response = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Failed to update status:", errorData);
        alert("Failed to update order status");
        return;
      }

      const updatedOrder = await response.json();

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: updatedOrder.status } : order
        )
      );
    } catch (error) {
      console.error("Update status error:", error);
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-5">
              <div className="mb-4">
                <p className="font-semibold">Order ID: {order.id}</p>

                <div className="mt-2">
                  <label className="block mb-2 font-medium">Status</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    disabled={updatingId === order.id}
                    className="border p-2 rounded"
                  >
                    <option value="New">New</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <p className="mt-2">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="mb-4">
                <p className="font-semibold">Customer</p>
                <p>Name: {order.customerName}</p>
                <p>Email: {order.email}</p>
                <p>Phone: {order.phone}</p>
                <p>Address: {order.address}</p>
              </div>

              <div className="mb-4">
                <p className="font-semibold">Items</p>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="border rounded p-3">
                      <p>{item.name}</p>
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-lg font-bold">Total: ${order.total}</p>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={handleLogout}
        className="mb-6 px-4 py-2 border rounded-lg"
        >
        Logout
      </button>
    </div>
  );
}