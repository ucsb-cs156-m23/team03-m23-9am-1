package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.RecommendationRequest;
import edu.ucsb.cs156.example.errors.EntityNotFoundException;
import edu.ucsb.cs156.example.repositories.RecommendationRequestRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;
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

@Tag(name = "Recommendation Request")
@RequestMapping("/api/recommendationrequest")
@RestController
@Slf4j
public class RecommendationRequestController extends ApiController {

    @Autowired
    RecommendationRequestRepository recReqRepository;

    @Operation(summary= "List all recommendation requests")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<RecommendationRequest> getAll() {
        Iterable<RecommendationRequest> recReqs = recReqRepository.findAll();
        return recReqs;
    }

    @Operation(summary= "Get a single recommendation request")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public RecommendationRequest getById(
            @Parameter(name="id") @RequestParam Long id) {
        RecommendationRequest recReq = recReqRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(RecommendationRequest.class, id));
        return recReq;
    }

    @Operation(summary= "Create a new recommendation request")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/post")
    public RecommendationRequest create(
            @Parameter(name="requesterEmail") @RequestParam String requesterEmail,
            @Parameter(name="professorEmail") @RequestParam String professorEmail,
            @Parameter(name="explanation") @RequestParam String explanation,
            @Parameter(name="dateRequested", description="in ISO format, e.g. YYYY-mm-ddTHH:MM:SS; see https://en.wikipedia.org/wiki/ISO_8601", example="2023-01-01T00:00:00") @RequestParam("dateRequested") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateRequested,
            @Parameter(name="dateNeeded", description="in ISO format, e.g. YYYY-mm-ddTHH:MM:SS; see https://en.wikipedia.org/wiki/ISO_8601", example="2023-05-01T23:59:59") @RequestParam("dateNeeded") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateNeeded,
            @Parameter(name="done") @RequestParam boolean done)
            throws JsonProcessingException {

        // For an explanation of @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        // See: https://www.baeldung.com/spring-date-parameters

        log.info("requesterEmail={} | professorEmail={} | explanation={} | dateRequested={} | dateNeeded={} | done={}", requesterEmail, professorEmail, explanation, dateRequested, dateNeeded, done);

        RecommendationRequest recReq = new RecommendationRequest();
        recReq.setRequesterEmail(requesterEmail);
        recReq.setProfessorEmail(professorEmail);
        recReq.setExplanation(explanation);
        recReq.setDateRequested(dateRequested);
        recReq.setDateNeeded(dateNeeded);
        recReq.setDone(done);

        RecommendationRequest saved = recReqRepository.save(recReq);
        return saved;
    }

    @Operation(summary= "Delete a recommendation request")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("")
    public Object delete(
            @Parameter(name="id") @RequestParam Long id) {
        RecommendationRequest recReq = recReqRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(RecommendationRequest.class, id));

        recReqRepository.delete(recReq);
        return genericMessage("RecommendationRequest with id %s deleted".formatted(id));
    }

    @Operation(summary= "Update a single recommendation request")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("")
    public RecommendationRequest update(
            @Parameter(name="id") @RequestParam Long id,
            @RequestBody @Valid RecommendationRequest incoming) {

        RecommendationRequest recReq = recReqRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(RecommendationRequest.class, id));

        recReq.setRequesterEmail(incoming.getRequesterEmail());
        recReq.setProfessorEmail(incoming.getProfessorEmail());
        recReq.setExplanation(incoming.getExplanation());
        recReq.setDateRequested(incoming.getDateRequested());
        recReq.setDateNeeded(incoming.getDateNeeded());
        recReq.setDone(incoming.getDone());

        recReqRepository.save(recReq);
        return recReq;
    }
}
