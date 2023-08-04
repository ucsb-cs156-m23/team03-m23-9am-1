package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.UCSBOrganization;
import edu.ucsb.cs156.example.errors.EntityNotFoundException;
import edu.ucsb.cs156.example.repositories.UCSBOrganizationRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.time.LocalDateTime;

@Tag(name = "UCSB Organization")
@RequestMapping("/api/ucsborganization")
@RestController
@Slf4j
public class UCSBOrganizationController extends ApiController {

    @Autowired
    UCSBOrganizationRepository ucsbOrgRepository;

    @Operation(summary= "List all UCSB Organizations")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<UCSBOrganization> getAll() {
        Iterable<UCSBOrganization> ucsbOrgs = ucsbOrgRepository.findAll();
        return ucsbOrgs;
    }

    @Operation(summary= "Get a single UCSB Organization")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public UCSBOrganization getById(@Parameter(name="id") @RequestParam Long id) {
        UCSBOrganization ucsbOrg = ucsbOrgRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(UCSBOrganization.class,id));
        return ucsbOrg;
    }

    @Operation(summary= "Create a new UCSB Organization")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/post")
    public UCSBOrganization create(
        @Parameter(name="orgCode") @RequestParam String orgCode,
        @Parameter(name="orgTranslationShort") @RequestParam String orgTranslationShort,
        @Parameter(name="orgTranslation") @RequestParam String orgTranslation,
        @Parameter(name="inactive") @RequestParam boolean inactive
    ) throws JsonProcessingException {
        log.info("orgCode={} | orgTranslationShort={} | orgTranslation={} | inactive={}",orgCode,orgTranslationShort,orgTranslation,inactive);

        UCSBOrganization ucsbOrg = new UCSBOrganization();
        ucsbOrg.setOrgCode(orgCode);
        ucsbOrg.setOrgTranslationShort(orgTranslationShort);
        ucsbOrg.setOrgTranslation(orgTranslation);
        ucsbOrg.setInactive(inactive);

        UCSBOrganization savedOrg = ucsbOrgRepository.save(ucsbOrg);
        return savedOrg;
    }

    @Operation(summary= "Delete a UCSB Organization")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("")
    public Object delete(
            @Parameter(name="id") @RequestParam Long id) {
        UCSBOrganization ucsbOrg = ucsbOrgRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(UCSBOrganization.class,id));
        ucsbOrgRepository.delete(ucsbOrg);
        return genericMessage("UCSBOrganization with id %s deleted".formatted(id));
    }

    @Operation(summary= "Update a single UCSB Organization")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("")
    public UCSBOrganization update(
            @Parameter(name="id") @RequestParam Long id,
            @RequestBody @Valid UCSBOrganization incoming) {
        UCSBOrganization ucsbOrg = ucsbOrgRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(UCSBOrganization.class,id));
        ucsbOrg.setOrgCode(incoming.getOrgCode());
        ucsbOrg.setOrgTranslationShort(incoming.getOrgTranslationShort());
        ucsbOrg.setOrgTranslation(incoming.getOrgTranslation());
        ucsbOrg.setInactive(incoming.getInactive());

        ucsbOrgRepository.save(ucsbOrg);
        return ucsbOrg;
    }
}
