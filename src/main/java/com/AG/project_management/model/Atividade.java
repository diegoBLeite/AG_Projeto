package com.AG.project_management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Atividade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;
    @Enumerated(EnumType.STRING)
    //private StatusAtividade status;
    @ManyToOne
    @JoinColumn(name = "projeto_id")
    private Projeto projeto;
}
