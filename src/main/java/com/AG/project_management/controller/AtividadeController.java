package com.AG.project_management.controller;

import com.AG.project_management.model.Atividade;
import com.AG.project_management.model.enums.StatusProjeto;
import com.AG.project_management.service.AtividadeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/atividades")
@RequiredArgsConstructor
public class AtividadeController {
    private final AtividadeService atividadeService;

    @PostMapping
    public ResponseEntity<Atividade> criarAtividade(@RequestBody Atividade atividade) {
        if (atividade.getProjeto().getStatus() != StatusProjeto.ABERTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Projeto não está aberto");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(atividadeService.salvar(atividade));
    }
}
