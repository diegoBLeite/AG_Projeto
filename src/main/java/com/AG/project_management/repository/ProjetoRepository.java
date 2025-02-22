package com.AG.project_management.repository;

import com.AG.project_management.model.Projeto;
import com.AG.project_management.model.enums.StatusProjeto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
    List<Projeto> findByStatus(StatusProjeto status); // Método que filtra por status
}
