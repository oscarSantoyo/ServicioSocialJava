package com.nielsen.buzz.outputchecks.visualizer.server;

import static spark.Spark.*;

import com.nielsen.buzz.outputchecks.visualizer.server.transform.JsonTransformer;

import spark.Spark;

public class Main {
	public static void main(String[] args) {
		JsonTransformer jsonTrans = new JsonTransformer();
		Spark.staticFileLocation("/public/");

		get("/hello/:name", (req, res) -> {
			String respuesta = "{\"name\":\"Hello World" + req.params(":name") + "\"}";
			return respuesta;
		});

		get("/database", (req, res) -> {
			res.raw().setContentType("application/json");
			return "";
		},jsonTrans);

		get("/database/:database", (req, res) -> {
			res.raw().setContentType("application/json");
			return "";
		},jsonTrans);

	}
}
