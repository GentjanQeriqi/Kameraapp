package com.example.kameraapp.models;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="kamerat")

public class Kamerat {
    @Id
    private String id;

    @NotBlank
    @Size(max=100)
    @Indexed(unique=true)
    private String emri;

    private String modeli;

    private int rezolucioni;

    private String ip;

    

    public Kamerat() {
        super();
    }

    public Kamerat(String emri) {
        this.emri = emri;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getEmri() {
        return this.emri;
    }

    public void setEmri(String emri) {
        this.emri = emri;
    }

    public String getModeli() {
        return this.modeli;
    }

    public void setModeli(String modeli) {
        this.modeli = modeli;
    }

    public int getRezolucioni() {
        return this.rezolucioni;
    }

    public void setRezolucioni(int rezolucioni) {
        this.rezolucioni = rezolucioni;
    }

    public String getIp() {
        return this.ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", emri='" + getEmri() + "'" +
            ", modeli='" + getModeli() + "'" +
            ", rezolucioni='" + getRezolucioni() + "'" +
            ", ip='" + getIp() + "'" +
            "}";
    }
   
   
}