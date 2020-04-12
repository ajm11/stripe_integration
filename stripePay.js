window.onload = function() {
    // Set test API key for Stripe checkout
    var stripe = Stripe('pk_test_KshjM2HaJnC6WY0maPEzedex00c9EnSoZp');
    
    // Define list of items we're selling in JSON data
    let items = [
        {
            itemName: 'penguin1',
            sku: 'sku_H2gxUY2sL8gMF2',
            imgSrc: 'https://images.pexels.com/photos/2078475/pexels-photo-2078475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            successUrl: 'https://ajm11.github.io/stripe_integration/success.html',
            failurelUrl: 'https://ajm11.github.io/stripe_integration/cancel.html'
        },
        {
            itemName: 'penguin2',
            sku: 'sku_H2ipar9VF21fKO',
            imgSrc: 'https://images.pexels.com/photos/60088/pexels-photo-60088.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            successUrl: 'https://ajm11.github.io/stripe_integration/success.html',
            failurelUrl: 'https://ajm11.github.io/stripe_integration/cancel.html'
        },
        {
            itemName: 'penguin3',
            sku: 'sku_H5Lpa9zrtxD5sr',
            imgSrc: 'https://cdn.pixabay.com/photo/2019/11/14/01/48/penguin-4625136_1280.jpg',
            successUrl: 'https://ajm11.github.io/stripe_integration/success.html',
            failurelUrl: 'https://ajm11.github.io/stripe_integration/cancel.html'
        },
    ]

    // Define the product row from the HTML
    let penguinRow = document.getElementById("first-row");
    var whichPenguin = undefined;

    // Iterate through the JSON data to display all of the products in a row

    for (let i = 0; i < items.length; i++) {
        // Create a div for each product, define the attributes
        let createPenguins = document.createElement('div');
        createPenguins.setAttribute("class","penguindivs");
        let createPenguinImage = document.createElement('img');
        createPenguinImage.setAttribute("src",items[i].imgSrc);
        createPenguinImage.setAttribute("id","penguin-img");
        let createButton = document.createElement('BUTTON');
        createButton.setAttribute("class","choosepenguin");
        createButton.setAttribute("id","penguin"+(i-1));
        createButton.innerText = 'Choose this penguin';
        createButton.addEventListener('click',function(){
            whichPenguin = i;
        })
        
        createPenguins.appendChild(createPenguinImage);
        createPenguins.appendChild(createButton);

        // Append the product to the row overall
        penguinRow.appendChild(createPenguins);
    }
    
        // Define the checkout button and set a listener for clicks to check out
        var checkout = document.getElementById("checkoutbutton");
        checkout.addEventListener('click', async function(){
            if (whichPenguin == undefined) {
                alert("Pick a penguin in order to check out.");
            } else{
                stripe.redirectToCheckout({
                    items: [                
                    {sku: items[whichPenguin].sku, quantity: 1}
                    ],
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
    

    /*
    // Define the penguin selector buttons and set listener to assign which penguin
    var leftpenguin = document.getElementById("leftpenguin");
    var rightpenguin = document.getElementById("rightpenguin");
    var whichpenguin = undefined;
    var penguinarray = {"leftpenguin": "sku_H2gxUY2sL8gMF2", "rightpenguin": "sku_H2ipar9VF21fKO"};

    leftpenguin.addEventListener('click',function(){
        if (whichpenguin != "leftpenguin") {
            rightpenguin.setAttribute("class","choosepenguin");
            whichpenguin = "leftpenguin";
            leftpenguin.setAttribute("class","choosepenguin_selected");
        }
        
    })
    rightpenguin.addEventListener('click',function(){
        if (whichpenguin != "rightpenguin"){
            leftpenguin.setAttribute("class","choosepenguin");
            whichpenguin = "rightpenguin";
            rightpenguin.setAttribute("class","choosepenguin_selected");
        }

    })
    */
     