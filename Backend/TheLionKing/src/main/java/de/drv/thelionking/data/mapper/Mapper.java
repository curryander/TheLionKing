package de.drv.thelionking.data.mapper;

public interface Mapper<A, B> {
    public B mapTo(A a);

    public A mapFrom(B b);
}
