package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Parametro;
import com.mycompany.myapp.service.ParametroService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Parametro}.
 */
@RestController
@RequestMapping("/api")
public class ParametroResource {

    private final Logger log = LoggerFactory.getLogger(ParametroResource.class);

    private static final String ENTITY_NAME = "parametro";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParametroService parametroService;

    public ParametroResource(ParametroService parametroService) {
        this.parametroService = parametroService;
    }

    /**
     * {@code POST  /parametros} : Create a new parametro.
     *
     * @param parametro the parametro to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new parametro, or with status {@code 400 (Bad Request)} if the parametro has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/parametros")
    public ResponseEntity<Parametro> createParametro(@RequestBody Parametro parametro) throws URISyntaxException {
        log.debug("REST request to save Parametro : {}", parametro);
        if (parametro.getId() != null) {
            throw new BadRequestAlertException("A new parametro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Parametro result = parametroService.save(parametro);
        return ResponseEntity.created(new URI("/api/parametros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /parametros} : Updates an existing parametro.
     *
     * @param parametro the parametro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parametro,
     * or with status {@code 400 (Bad Request)} if the parametro is not valid,
     * or with status {@code 500 (Internal Server Error)} if the parametro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/parametros")
    public ResponseEntity<Parametro> updateParametro(@RequestBody Parametro parametro) throws URISyntaxException {
        log.debug("REST request to update Parametro : {}", parametro);
        if (parametro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Parametro result = parametroService.save(parametro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, parametro.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /parametros} : get all the parametros.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of parametros in body.
     */
    @GetMapping("/parametros")
    public List<Parametro> getAllParametros() {
        log.debug("REST request to get all Parametros");
        return parametroService.findAll();
    }

    /**
     * {@code GET  /parametros/:id} : get the "id" parametro.
     *
     * @param id the id of the parametro to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the parametro, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/parametros/{id}")
    public ResponseEntity<Parametro> getParametro(@PathVariable Long id) {
        log.debug("REST request to get Parametro : {}", id);
        Optional<Parametro> parametro = parametroService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parametro);
    }

    /**
     * {@code DELETE  /parametros/:id} : delete the "id" parametro.
     *
     * @param id the id of the parametro to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/parametros/{id}")
    public ResponseEntity<Void> deleteParametro(@PathVariable Long id) {
        log.debug("REST request to delete Parametro : {}", id);
        parametroService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
