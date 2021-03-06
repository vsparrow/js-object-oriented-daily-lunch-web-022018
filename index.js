let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0;


// Customer class:
//
// new Customer() — initialized with both name,
//   and an instance of an employer;
//   returns a JavaScript object that has attributes of id, employerId, and name
// meals() - returns all of the meals that a customer has had delivered
// deliveries() — returns all of the deliveries that customer has received
// totalSpent() - returns the total amount that the customer has spent,
  // as a function of the cost of the meals he has had delivered



class Customer {
  constructor(name, employer){
    this.name = name;
    if (employer) {this.employerId = employer.id;}
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }

  meals(){
    return this.deliveries().map(delivery => delivery.mealId).map(mealId => store.meals.find(meal => meal.id === mealId))
  }

  totalSpent(){
    // return this.meals().reduce(meal => meal.price);
    let currentTotal=0
    return this.meals().reduce(function(currentTotal,meal) {return currentTotal + meal.price},currentTotal);
  }
}

let employerId = 0;

class Employer {
  constructor(name){
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }

  employees(){
    return store.customers.filter(customer => customer.employerId === this.id);
  }

  deliveries(){
    let x = this.employees().map(employee => employee.deliveries());
    return x.reduce(function(accumulator, currentValue){
      return [...accumulator, ...currentValue];
    }, []);
  }

  mealFather(){return this.deliveries().map(delivery => delivery.meal())}

  meals(){
    // return [...new Set(this.deliveries().map(delivery => delivery.meal()))]
    return [...new Set(this.mealFather())]
  }

  mealTotals(){
    let obj = {}
    let meals = this.mealFather();
    this.meals().forEach( function(meal){
      // if(obj[meal.id])
      let count =0;
      // debugger;
      // this.deliveries().forEach({function(delivery){ if (delivery.meal()==meal){ count++}     }}) /////////////////////////
      meals.forEach(function(newMeal){ if (newMeal==meal){ count++}     }) /////////////////////////
      obj[meal.id]=count;
    })
    // debugger;
    return obj
  }//mealTotals


}


// Meal class:
//
// new Meal() — initialized with title and price;
  // returns an object that has attributes oftitle, price, and id
// deliveries() - returns all of the deliveries that delivered the particular meal.
// customers() - returns all of the customers who have had the meal delivered.
// byPrice() - A class method that orders the meals by their price.
  // Use the static keyword to write a class method.
// let store = {customers: [], meals: [], deliveries: [], employers: []}

let mealid = 0;
class Meal {
  constructor(title,price){
    this.title=title;
    this.price=price;
    this.id = ++mealid
    store.meals.push(this)
  }//end constructor
  deliveries(){// deliveries() - returns all of the deliveries that delivered the particular meal.
    return store.deliveries.filter((delivery)=>{ return delivery.mealId==this.id })
  }//deliveries
  customers(){
    // return this.deliveries().map(delivery => delivery.mealId).map(mealId => store.meals.find(meal => meal.id === mealId))
    return this.deliveries().map(delivery=>delivery.customerId).map(customerId => store.customers.find(customer=>customer.id==customerId))
  }//customers
  static byPrice(){
    return store.meals.sort( function(a,b){
      if (a.price > b.price) {
        return -1;
      }
      if (a.price < b.price) {
        return 1;
      }
      return 0;
    })//sort
  }
}//end class


// Delivery class:

// new Delivery() — initialized with meal and customer;
// returns an object that has attributes of mealId, customerId, and id
// meal() - returns the meal associated with the delivery
// customer() - returns the customer associated with the delivery

let deliveryId = 0;
class Delivery {
  constructor(meal,customer){
    if(meal){    this.mealId = meal.id;}
    if(customer){    this.customerId = customer.id;}

    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal(){return store.meals.find( meal => meal.id== this.mealId )}//delivery.meal
  customer(){return store.customers.find( customer => customer.id== this.customerId )}//delivery.meal
}//delivery
