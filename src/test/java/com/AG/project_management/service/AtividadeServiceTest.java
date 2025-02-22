package com.AG.project_management.service;

import com.AG.project_management.model.Atividade;
import com.AG.project_management.model.Projeto;
import com.AG.project_management.model.enums.StatusProjeto;
import com.AG.project_management.repository.AtividadeRepository;
import com.AG.project_management.repository.ProjetoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
class AtividadeServiceTest {

    @Autowired
    private AtividadeService atividadeService;

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private AtividadeRepository atividadeRepository;

    @Test
    @Transactional
    void deveLancarErroSeProjetoNaoEstiverAberto() {
        Projeto projeto = new Projeto();
        projeto.setStatus(StatusProjeto.FECHADO);
        projetoRepository.save(projeto);

        Atividade atividade = new Atividade();
        atividade.setProjeto(projeto);

        assertThrows(IllegalArgumentException.class, () -> atividadeService.salvar(atividade));
    }
}
