package com.mycompany.myapp.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Parametro.
 */
@Entity
@Table(name = "parametro")
public class Parametro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private Integer code;

    @Column(name = "value")
    private String value;

    @OneToMany(mappedBy = "parametro")
    private Set<Persona> personas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCode() {
        return code;
    }

    public Parametro code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getValue() {
        return value;
    }

    public Parametro value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Set<Persona> getPersonas() {
        return personas;
    }

    public Parametro personas(Set<Persona> personas) {
        this.personas = personas;
        return this;
    }

    public Parametro addPersona(Persona persona) {
        this.personas.add(persona);
        persona.setParametro(this);
        return this;
    }

    public Parametro removePersona(Persona persona) {
        this.personas.remove(persona);
        persona.setParametro(null);
        return this;
    }

    public void setPersonas(Set<Persona> personas) {
        this.personas = personas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Parametro)) {
            return false;
        }
        return id != null && id.equals(((Parametro) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Parametro{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", value='" + getValue() + "'" +
            "}";
    }
}
