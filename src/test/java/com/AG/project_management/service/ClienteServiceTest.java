package com.AG.project_management.service;

import com.AG.project_management.model.Cliente;
import com.AG.project_management.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
class ClienteServiceTest {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ClienteRepository clienteRepository;

    @Test
    @Transactional
    void deveLancarExcecaoSeCnpjCpfDuplicado() {
        Cliente cliente = new Cliente();
        cliente.setCnpjCpf("12345678900");
        clienteService.createCliente(cliente);

        assertThrows(IllegalArgumentException.class, () -> {
            clienteService.createCliente(cliente);
        });
    }
}