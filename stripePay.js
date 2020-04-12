window.onload = function() {
    console.log(multiple(3,6));
    // Set test API key for Stripe checkout
    var stripe = Stripe('pk_test_KshjM2HaJnC6WY0maPEzedex00c9EnSoZp');
    
    // Define the array to pass to Stripe
    var passToStripe = [];

    // Define list of items we're selling in JSON data
    var items = [
        {
            itemName: 'penguin1',
            sku: 'sku_H2gxUY2sL8gMF2',
            imgSrc: 'https://images.pexels.com/photos/2078475/pexels-photo-2078475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            successUrl: 'https://ajm11.github.io/stripe_integration/success.html',
            failurelUrl: 'https://ajm11.github.io/stripe_integration/cancel.html',
            quantity: 0,
        },
        {
            itemName: 'penguin2',
            sku: 'sku_H2ipar9VF21fKO',
            imgSrc: 'https://images.pexels.com/photos/60088/pexels-photo-60088.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            successUrl: 'https://ajm11.github.io/stripe_integration/success.html',
            failurelUrl: 'https://ajm11.github.io/stripe_integration/cancel.html',
            quantity: 0,
        },
        {
            itemName: 'penguin3',
            sku: 'sku_H5Lpa9zrtxD5sr',
            imgSrc: 'https://cdn.pixabay.com/photo/2019/11/14/01/48/penguin-4625136_1280.jpg',
            successUrl: 'https://ajm11.github.io/stripe_integration/success.html',
            failurelUrl: 'https://ajm11.github.io/stripe_integration/cancel.html',
            quantity: 0,
        },
    ]

    // Define the product row from the HTML
    let penguinRow = document.getElementById("first-row");

    // Iterate through the JSON data to display all of the products in a row
    for (let i = 0; i < items.length; i++) {
        // Create a div for each product, define the attributes
        let createPenguins = document.createElement('div');
        createPenguins.setAttribute("class","penguindivs");

        let createPenguinImage = document.createElement('img');
        createPenguinImage.setAttribute("src",items[i].imgSrc);
        createPenguinImage.setAttribute("id","penguin-img");
        
        let createButton = document.createElement('button');
        createButton.setAttribute("class","choosepenguin");
        createButton.setAttribute("id","penguin"+(i-1));
        createButton.innerText = 'Choose this penguin';

        // Increment the count when you click the button
        createButton.addEventListener('click',function(){
            // Color the button to indicate it's selected
            createButton.setAttribute("class","choosepenguin_selected")

            // Increment the quantity of this SKU
            items[i].quantity = items[i].quantity + 1;
            createCounter.innerHTML = 'In cart: ' + items[i].quantity;
    
        })
        
        let createCounter = document.createElement("p");
        createCounter.innerText = 'In cart: ' + items[i].quantity;

        createPenguins.appendChild(createPenguinImage);
        createPenguins.appendChild(createButton);
        createPenguins.appendChild(createCounter);

        // Append the product to the row overall
        penguinRow.appendChild(createPenguins);
    }

        // Define the checkout button and set a listener for clicks to check out
        var checkout = document.getElementById("checkoutbutton");
        checkout.addEventListener('click', async function(){
            
            // Determine what you're going to pass to Stripe
            for (let i = 0; i < items.length; i++){
                if (items[i].quantity > 0){
                    let sku = items[i].sku;
                    let quantity = items[i].quantity;
                    let pushProduct = {
                        "sku" : sku,
                        "quantity" : quantity
                    };
                    passToStripe.push(pushProduct);        
                }
            }
            console.log(passToStripe);

            if (passToStripe.length < 1) {
                alert("Pick a penguin in order to check out.");
            } else{
                stripe.redirectToCheckout({
                    items: passToStripe,
                    successUrl: 'https://ajm11.github.io/stripe_integration/success.html',
                    cancelUrl: 'https://ajm11.github.io/stripe_integration/cancel.html',
                }).then(function (result) {
                    // If `redirectToCheckout` fails due to a browser or network
                    // error, display the localized error message to your customer
                    // using `result.error.message`.
                    console.log(result.error.message)
                });
            }
        })
    }
    function multiple(x,y){
        return x * y;
    }