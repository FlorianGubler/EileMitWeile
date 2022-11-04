package com.github.floriangubler.eilemitweile.entity;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Entity(name = "MEMBER")
@DynamicUpdate
public class MemberEntity implements Serializable {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    @Type(type = "org.hibernate.type.UUIDCharType")
    UUID id = UUID.randomUUID();

    @Column(name = "email", nullable = false, unique = true)
    String email;

    @Column(name = "firstname", nullable = false)
    String firstname;

    @Column(name = "lastname", nullable = false)
    String lastname;

    @Column(name = "password", nullable = false)
    String passwordHash;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        MemberEntity that = (MemberEntity) o;
        return id != null && Objects.equals(id, that.id) &&
                email != null && Objects.equals(email, that.email) &&
                passwordHash != null && Objects.equals(passwordHash, that.passwordHash);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
