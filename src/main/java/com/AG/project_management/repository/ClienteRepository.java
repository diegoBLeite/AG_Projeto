package com.AG.project_management.repository;

import com.AG.project_management.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByCnpjCpf(String cnpjCpf);
}