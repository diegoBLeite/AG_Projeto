package com.AG.project_management.service;

import com.AG.project_management.model.Projeto;
import com.AG.project_management.model.enums.StatusProjeto;
import com.AG.project_management.repository.ProjetoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProjetoServiceTest {
    @Mock
    private ProjetoRepository projetoRepository;

    @InjectMocks
    private ProjetoService projetoService;

    @Test
    void deveListarProjetosAbertos() {
        Projeto projeto = new Projeto();
        projeto.setStatus(StatusProjeto.ABERTO);
        when(projetoRepository.findByStatus(StatusProjeto.ABERTO)).thenReturn(List.of(projeto));

        List<Projeto> resultado = projetoService.listarProjetosAbertos();
        assertEquals(1, resultado.size());
    }
}
