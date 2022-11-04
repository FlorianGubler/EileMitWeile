package com.github.floriangubler.eilemitweile.exception;

public class UsernamePasswordException extends Throwable{
    public UsernamePasswordException(){
        super("Username or Password wrong");
    }
}
