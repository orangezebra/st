function SHIPPING_API_SERVICE(id, quantity) {
    return 0;
}


class Address {
    line_1;
    line_2;
    city;
    state;
    zip;

    constructor(line_1, line_2, city, state, zip) {
        this.line_1 = line_1;
        this.line_2 = line_2;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
}

class Customer {
    first_name;
    last_name;
    #addresses = [];

    constructor(first_name, last_name) {
        this.first_name = first_name;
        this.last_name = last_name;
    }

    getFullName() {
        return `${this.first_name} ${this.last_name}`;
    }

    addAddress(address) {
        this.#addresses.push(address);
    }

    listAddresses() {
        return this.#addresses;
    }
}

class Item {
    #id;
    #name;
    #quantity;
    #price;

    constructor(id, name, quantity, price) {
        this.#id = id;
        this.#name = name;
        this.#quantity = quantity;
        this.#price = price;
    }

    cost() {
        const subtotal = this.#price * this.#quantity;
        const tax = subtotal * 0.07;
        let shipping;
        try {
            shipping = SHIPPING_API_SERVICE(this.#id, this.#quantity);
        } catch (error) {
            throw new Error(`Could not get shipping information for ${this.#id}, Error: ${error}`);
        }
        const total = Math.round((subtotal + tax + shipping) * 100) / 100;

        return {subtotal, tax, shipping, total};
    }

    getItemInformation() {
        return {
            id: this.#id,
            name: this.#name,
            quantity: this.#quantity,
            price: this.#price,
            cost: this.cost()
        }
    }
}

class Cart {
    #customer;
    #address = null;
    #items = [];

    constructor(customer) {
        this.#customer = customer;
    }

    get address() {
        return this.#address;
    }

    set address(a) {
        this.#address = a;
    }

    cost() {
        return this.#items
            .map(i => i.cost())
            .reduce((total, cur) => {
                return {
                    subtotal: total.subtotal + cur.subtotal,
                    tax: total.tax + cur.tax,
                    shipping: total.shipping + cur.shipping,
                    total: total.total + cur.total
                }
            }, {subtotal: 0, tax: 0, shipping: 0, total: 0});
    }

    addItem(item) {
        this.#items.push(item);
    }

    listItems() {
        return this.#items.map(i => i.getItemInformation());
    }
}


const address1 = new Address('123 Fake St.', '', 'Fakeville', 'CA', 12345);
const address2 = new Address('456 Fake St.', '', 'Fakedale', 'CA', 67890);

const customer1 = new Customer('David', 'Sigal');

customer1.addAddress(address1);
customer1.addAddress(address2);

console.log(customer1.getFullName());
console.log(customer1.listAddresses());

const item1 = new Item(1, 'Rubber Duck', 1, 1.50);
const item2 = new Item(2, 'Teddy Bear', 3, 5);

const cart = new Cart(customer1);

cart.addItem(item1);
cart.addItem(item2);

console.log(cart.listItems());

cart.address = customer1.listAddresses()[0];

console.log(cart.address);

console.log(cart.cost());


