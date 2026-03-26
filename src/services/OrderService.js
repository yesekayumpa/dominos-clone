// Order service for managing order data and history

class OrderService {
  // Mock order data - in production, this would come from an API
  static getMockOrders() {
    return [
      {
        id: '1',
        orderNumber: '#DOM-2024-001',
        date: 'March 25, 2024',
        status: 'delivered',
        items: [
          {
            name: 'Pepperoni Pizza',
            quantity: 2,
            price: '13000 FCFA',
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200'
          },
          {
            name: 'Coca Cola',
            quantity: 2,
            price: '2000 FCFA',
            image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200'
          }
        ],
        itemCount: 4,
        totalPrice: '15000 FCFA',
        deliveryTime: '25-35 mins',
        address: '70 Washington Square South',
        restaurant: 'Domino\'s Pizza - Downtown',
        deliveryFee: '1500 FCFA',
        tax: '500 FCFA'
      },
      {
        id: '2',
        orderNumber: '#DOM-2024-002',
        date: 'March 24, 2024',
        status: 'ontheway',
        items: [
          {
            name: 'Margherita Pizza',
            quantity: 1,
            price: '10000 FCFA',
            image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200'
          },
          {
            name: 'Garlic Bread',
            quantity: 1,
            price: '3000 FCFA',
            image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=200'
          }
        ],
        itemCount: 2,
        totalPrice: '13000 FCFA',
        deliveryTime: '20-30 mins',
        address: '4233 Kimball Ave. Chicago',
        restaurant: 'Domino\'s Pizza - North Side',
        deliveryFee: '1500 FCFA',
        tax: '500 FCFA'
      },
      {
        id: '3',
        orderNumber: '#DOM-2024-003',
        date: 'March 23, 2024',
        status: 'preparing',
        items: [
          {
            name: 'BBQ Chicken Pizza',
            quantity: 1,
            price: '15000 FCFA',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200'
          },
          {
            name: 'Chicken Wings',
            quantity: 1,
            price: '8000 FCFA',
            image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200'
          }
        ],
        itemCount: 2,
        totalPrice: '23000 FCFA',
        deliveryTime: '30-40 mins',
        address: '5012 Hardcove Yohanban',
        restaurant: 'Domino\'s Pizza - West End',
        deliveryFee: '1500 FCFA',
        tax: '500 FCFA'
      },
      {
        id: '4',
        orderNumber: '#DOM-2024-004',
        date: 'March 22, 2024',
        status: 'cancelled',
        items: [
          {
            name: 'Veggie Pizza',
            quantity: 1,
            price: '12000 FCFA',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200'
          }
        ],
        itemCount: 1,
        totalPrice: '12000 FCFA',
        deliveryTime: '20-30 mins',
        address: '4233 Logan St. Oldsmar',
        restaurant: 'Domino\'s Pizza - East Side',
        deliveryFee: '0 FCFA',
        tax: '0 FCFA'
      },
      {
        id: '5',
        orderNumber: '#DOM-2024-005',
        date: 'March 21, 2024',
        status: 'delivered',
        items: [
          {
            name: 'Hawaiian Pizza',
            quantity: 2,
            price: '22000 FCFA',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200'
          },
          {
            name: 'Sprite',
            quantity: 2,
            price: '2000 FCFA',
            image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200'
          }
        ],
        itemCount: 4,
        totalPrice: '24000 FCFA',
        deliveryTime: '25-35 mins',
        address: '70 Washington Square South',
        restaurant: 'Domino\'s Pizza - Downtown',
        deliveryFee: '1500 FCFA',
        tax: '500 FCFA'
      }
    ];
  }

  // Get all orders
  static async getAllOrders() {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getMockOrders());
      }, 500);
    });
  }

  // Get orders by status
  static async getOrdersByStatus(status) {
    const allOrders = await this.getAllOrders();
    if (status === 'all') return allOrders;
    return allOrders.filter(order => order.status === status);
  }

  // Get order by ID
  static async getOrderById(orderId) {
    const allOrders = await this.getAllOrders();
    return allOrders.find(order => order.id === orderId);
  }

  // Create new order
  static async createOrder(orderData) {
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `#DOM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'pending',
      ...orderData
    };

    // In production, this would be sent to an API
    console.log('Creating order:', newOrder);
    return newOrder;
  }

  // Cancel order
  static async cancelOrder(orderId) {
    // In production, this would be sent to an API
    console.log('Cancelling order:', orderId);
    return { success: true };
  }

  // Get order statistics
  static getOrderStats(orders) {
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      preparing: orders.filter(o => o.status === 'preparing').length,
      ontheway: orders.filter(o => o.status === 'ontheway').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalSpent: orders
        .filter(o => o.status === 'delivered')
        .reduce((sum, order) => {
          // Extract numeric value from price string
          const price = parseInt(order.totalPrice.replace(/[^0-9]/g, ''));
          return sum + price;
        }, 0)
    };

    return stats;
  }

  // Format price for display
  static formatPrice(price) {
    return `${price} FCFA`;
  }

  // Calculate estimated delivery time
  static calculateEstimatedDeliveryTime(orderItems) {
    const prepTime = 15; // Base preparation time
    const itemTime = orderItems.length * 2; // 2 minutes per item
    const deliveryTime = 20; // Average delivery time
    
    const totalMinutes = prepTime + itemTime + deliveryTime;
    const minTime = totalMinutes - 5;
    const maxTime = totalMinutes + 5;
    
    return `${minTime}-${maxTime} mins`;
  }
}

export default OrderService;
