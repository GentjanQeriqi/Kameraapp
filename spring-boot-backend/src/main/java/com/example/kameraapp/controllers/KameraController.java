package com.example.kameraapp.controllers;

import javax.validation.Valid;
import com.example.kameraapp.models.Kamerat;
import com.example.kameraapp.repositories.KameratRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class KameraController {

    @Autowired
    KameratRepository kameraRepository;

    @GetMapping("/kamerat")
    public List<Kamerat> getAllKamerat() {
       
        return kameraRepository.findAll();
    }

    @PostMapping("/kamerat")
    public Kamerat createKamera(@Valid @RequestBody Kamerat kamera) {
       
        return kameraRepository.save(kamera);
    }

    @GetMapping(value="/kamerat/{id}")
    public ResponseEntity<Kamerat> getKameraById(@PathVariable("id") String id) {
        return kameraRepository.findById(id)
                .map(kamera -> ResponseEntity.ok().body(kamera))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(value="/kamerat/{id}")
    public ResponseEntity<Kamerat> updateKamera(@PathVariable("id") String id,
                                           @Valid @RequestBody Kamerat kamera) {
        return kameraRepository.findById(id)
                .map(kameraData -> {
                    kameraData.setEmri(kamera.getEmri());
                    kameraData.setModeli(kamera.getModeli());
                    kameraData.setRezolucioni(kamera.getRezolucioni());
                    kameraData.setIp(kamera.getIp());
                    Kamerat updatedKamera = kameraRepository.save(kameraData);
                    return ResponseEntity.ok().body(updatedKamera);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value="/kamerat/{id}")
    public ResponseEntity<?> deleteKamera(@PathVariable("id") String id) {
        return kameraRepository.findById(id)
                .map(kamera -> {
                    kameraRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }

@GetMapping(value = "/rezolucioni")
    public List<Integer> getRezolucione() {
        
        
        List<Kamerat> t =  kameraRepository.findAll();
        int i [] = t.stream().mapToInt(a -> {return a.getRezolucioni();}).toArray();
        
        List<Integer> intList = new ArrayList<Integer>(i.length);
        for (int a : i)
        {
            intList.add(a);
        }
        return intList;
    }

}