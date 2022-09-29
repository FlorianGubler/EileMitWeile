package com.github.floriangubler.eilemitweile.exception;

public class BookingNotFoundException extends RuntimeException {
    public BookingNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
