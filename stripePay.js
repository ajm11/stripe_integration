window.onload = function() {
    // Set test API key for Stripe checkout
    var stripe = Stripe('pk_test_KshjM2HaJnC6WY0maPEzedex00c9EnSoZp');
    
    // Define the penguin selector buttons and set listener to assign which penguin
    var leftpenguin = document.getElementById("leftpenguin");
    var rightpenguin = document.getElementById("rightpenguin");
    var whichpenguin = undefined;
    var penguinarray = {"leftpenguin": "sku_H2gxUY2sL8gMF2", "rightpenguin": "sku_H2ipar9VF21fKO"};

    leftpenguin.addEventListener('click',function(){
        whichpenguin = "leftpenguin";
        console.log("picked left");
        console.log(whichpenguin);
        console.log(penguinarray[whichpenguin]);
    })
    rightpenguin.addEventListener('click',function(){
        whichpenguin = "rightpenguin";
        console.log("picked right");
        console.log(whichpenguin);
        console.log(penguinarray[whichpenguin]);
    })

    // Define the checkout button and set a listener for clicks to check out
    var checkout = document.getElementById("checkoutbutton");
    checkout.addEventListener('click', async function(){
        console.log("In checkout " + penguinarray[whichpenguin]);
        stripe.redirectToCheckout({
            items: [
              // Replace with the ID of your SKU
              
              //{sku: penguinarray[whichpenguin], quantity: 1}
              {sku: penguinarray[whichpenguin], quantity: 1}
            ],
            successUrl: 'https://ajm11.github.io/stripe_integration/success.html',
            cancelUrl: 'https://ajm11.github.io/stripe_integration/cancel.html',
          }).then(function (result) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            console.log(result.error.message) // ADD THIS LINE!
          });
    })
}
     