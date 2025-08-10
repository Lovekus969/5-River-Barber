package com.fiverivers;

import static spark.Spark.*;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class BookingServer {

    public static void main(String[] args) {
        port(8080); // Server will run on http://localhost:8080

        post("/book", (req, res) -> {
            res.type("application/json");

            // Parse booking JSON from request body
            JsonObject data = JsonParser.parseString(req.body()).getAsJsonObject();
            String name = data.get("name").getAsString();
            String time = data.get("time").getAsString();

            // Send email first
            EmailSender.sendEmail("owner@example.com", name, time);

            // Then return success response
            JsonObject response = new JsonObject();
            response.addProperty("status", "success");
            response.addProperty("message", "Booking received and email sent to owner.");

            return response.toString();
        });
    }
}
