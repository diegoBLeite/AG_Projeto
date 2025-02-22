package com.AG.project_management.service;

import com.AG.project_management.model.Cliente;
import com.AG.project_management.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    // Cria um novo cliente
    @Transactional
    public Cliente createCliente(Cliente cliente) {
        // Validação básica (exemplo: evitar duplicação de CNPJ/CPF)
        if (clienteRepository.existsByCnpjCpf(cliente.getCnpjCpf())) {
            throw new IllegalArgumentException("CNPJ/CPF já cadastrado!");
        }
        return clienteRepository.save(cliente);
    }

    // Lista todos os clientes
    public List<Cliente> findAllClientes() {
        return clienteRepository.findAll();
    }

    // Busca cliente por ID
    public Cliente findClienteById(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado!"));
    }

    // Atualiza um cliente existente
    @Transactional
    public Cliente updateCliente(Long id, Cliente clienteAtualizado) {
        Cliente clienteExistente = findClienteById(id); // Reutiliza a busca com tratamento de exceção

        // Atualiza campos permitidos (exemplo: nome e email)
        clienteExistente.setNome(clienteAtualizado.getNome());
        clienteExistente.setEmail(clienteAtualizado.getEmail());

        return clienteRepository.save(clienteExistente);
    }

    // Exclui um cliente
    @Transactional
    public void deleteCliente(Long id) {
        Cliente cliente = findClienteById(id);
        clienteRepository.delete(cliente);
    }

    // salvar um cliente
    @Transactional
    public Cliente salvarCliente(Cliente cliente) {
        // Valida se o CNPJ/CPF já está cadastrado
        if (clienteRepository.existsByCnpjCpf(cliente.getCnpjCpf())) {
            throw new IllegalArgumentException("CNPJ/CPF já cadastrado!");
        }
        return clienteRepository.save(cliente); // Persiste no banco
    }

    // listar todos os clientes
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll(); // Retorna todos os registros
    }
}