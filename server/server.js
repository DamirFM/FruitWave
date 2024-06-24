// Import the Express module
const express = require("express");

// Import the CORS module
const cors = require("cors");

// Import the body-parser module
const bodyParser = require("body-parser");

// Import the Stripe module and initialize it with your private token
const stripe = require("stripe")(
  "sk_test_51PVDbpRq1jUUHxJfyax6mfSLtVF11OFnTC0qWwIYAW5yTUY8Pc191AemQyj0xAwl4FsV2lNL3yWQEtXDLPrVPsOa00S9BqVbIK"
);

// Create an instance of the Express application
const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Enable CORS with specific options
app.use(cors({ origin: true, credentials: true }));

// Define a POST route for the checkout process
app.post("/checkout", async (req, res, next) => {
  try {
    // Ensure items are provided in the request body and are in correct format
    if (
      !req.body.items ||
      !Array.isArray(req.body.items) ||
      req.body.items.length === 0
    ) {
      return res.status(400).json({ error: "Items are required for checkout" });
    }

    // Validate each item in the request
    const lineItems = req.body.items.map((item) => {
      // Ensure each item has required properties
      if (!item.name || !item.product || !item.price || !item.quantity) {
        throw new Error("Missing required item properties");
      }

      // Return the formatted line item object for Stripe
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.product],
          },
          unit_amount: item.price * 100, // Convert price to cents
        },
        quantity: item.quantity,
      };
    });

    // Create a new Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Accept only card payments
      shipping_address_collection: {
        allowed_countries: ["US", "CA"], // Allow shipping only to US and Canada
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0, // Free shipping
              currency: "usd",
            },
            display_name: "Free shipping",
            // Estimated delivery between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500, // $15.00 for next day air shipping
              currency: "usd",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items: lineItems,
      mode: "payment", // Set the mode to "payment" for one-time payments
      success_url: "http://localhost:4242/success.html", // URL to redirect on successful payment
      cancel_url: "http://localhost:4242/cancel.html", // URL to redirect on cancelled payment
    });

    // Send the session object as a JSON response
    res.status(200).json(session);
  } catch (error) {
    // Handle any errors
    next(error);
  }
});

// Start the server and listen on port 4242
app.listen(4242, () => {
  console.log("App is running on port 4242");
});
