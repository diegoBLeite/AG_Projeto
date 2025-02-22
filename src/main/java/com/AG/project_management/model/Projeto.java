package com.AG.project_management.model;

import com.AG.project_management.model.enums.StatusProjeto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Projeto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    @Enumerated(EnumType.STRING)
    private StatusProjeto status;
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
}