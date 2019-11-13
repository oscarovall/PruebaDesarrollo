package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Parametro;
import com.mycompany.myapp.repository.ParametroRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Parametro}.
 */
@Service
@Transactional
public class ParametroService {

    private final Logger log = LoggerFactory.getLogger(ParametroService.class);

    private final ParametroRepository parametroRepository;

    public ParametroService(ParametroRepository parametroRepository) {
        this.parametroRepository = parametroRepository;
    }

    /**
     * Save a parametro.
     *
     * @param parametro the entity to save.
     * @return the persisted entity.
     */
    public Parametro save(Parametro parametro) {
        log.debug("Request to save Parametro : {}", parametro);
        return parametroRepository.save(parametro);
    }

    /**
     * Get all the parametros.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Parametro> findAll() {
        log.debug("Request to get all Parametros");
        return parametroRepository.findAll();
    }


    /**
     * Get one parametro by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Parametro> findOne(Long id) {
        log.debug("Request to get Parametro : {}", id);
        return parametroRepository.findById(id);
    }

    /**
     * Delete the parametro by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Parametro : {}", id);
        parametroRepository.deleteById(id);
    }
}
