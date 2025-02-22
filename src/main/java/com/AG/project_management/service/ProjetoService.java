package com.AG.project_management.service;

import com.AG.project_management.model.Projeto;
import com.AG.project_management.model.enums.StatusProjeto;
import com.AG.project_management.repository.ProjetoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjetoService {
    private final ProjetoRepository projetoRepository;

    public List<Projeto> listarProjetosAbertos() {
        return projetoRepository.findByStatus(StatusProjeto.ABERTO);
    }
}
