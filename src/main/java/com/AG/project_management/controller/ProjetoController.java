package com.AG.project_management.controller;

import com.AG.project_management.model.Projeto;
import com.AG.project_management.service.ProjetoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projetos")
@RequiredArgsConstructor
public class ProjetoController {
    private final ProjetoService projetoService;

    @GetMapping("/abertos")
    public ResponseEntity<List<Projeto>> listarProjetosAbertos() {
        return ResponseEntity.ok(projetoService.listarProjetosAbertos());
    }
}
