package com.github.floriangubler.eilemitweile.exception;

public class GameNotFoundException extends RuntimeException {
    public GameNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
