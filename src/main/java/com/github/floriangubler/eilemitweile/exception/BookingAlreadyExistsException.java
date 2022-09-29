package com.github.floriangubler.eilemitweile.exception;

public class BookingAlreadyExistsException extends RuntimeException {
    public BookingAlreadyExistsException(String errorMessage) {
        super(errorMessage);
    }
}
