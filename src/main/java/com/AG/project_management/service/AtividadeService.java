package com.AG.project_management.service;

import com.AG.project_management.model.Atividade;
import com.AG.project_management.model.Projeto;
import com.AG.project_management.model.enums.StatusProjeto;
import com.AG.project_management.repository.AtividadeRepository;
import com.AG.project_management.repository.ProjetoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AtividadeService {

    private final AtividadeRepository atividadeRepository;
    private final ProjetoRepository projetoRepository;

    // Salva uma atividade, validando se o projeto está aberto
    @Transactional
    public Atividade salvar(Atividade atividade) {
        Projeto projeto = atividade.getProjeto();

        if (projeto == null) {
            throw new IllegalArgumentException("Atividade deve estar vinculada a um projeto!");
        }

        // Busca o projeto no banco para validar o status atual
        Projeto projetoNoBanco = projetoRepository.findById(projeto.getId())
                .orElseThrow(() -> new IllegalArgumentException("Projeto não encontrado!"));

        if (projetoNoBanco.getStatus() != StatusProjeto.ABERTO) {
            throw new IllegalArgumentException("Não é possível adicionar atividades a um projeto fechado ou em andamento!");
        }

        return atividadeRepository.save(atividade);
    }

    // Lista todas as atividades
    public List<Atividade> listarTodos() {
        return atividadeRepository.findAll();
    }

    // (Opcional) Métodos adicionais: buscarPorId, atualizar, deletar
    public Atividade buscarPorId(Long id) {
        return atividadeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Atividade não encontrada!"));
    }

    @Transactional
    public Atividade atualizar(Long id, Atividade atividadeAtualizada) {
        Atividade atividadeExistente = buscarPorId(id);
        atividadeExistente.setTitulo(atividadeAtualizada.getTitulo());
        atividadeExistente.setDescricao(atividadeAtualizada.getDescricao());
        return atividadeRepository.save(atividadeExistente);
    }

    @Transactional
    public void deletar(Long id) {
        Atividade atividade = buscarPorId(id);
        atividadeRepository.delete(atividade);
    }
}