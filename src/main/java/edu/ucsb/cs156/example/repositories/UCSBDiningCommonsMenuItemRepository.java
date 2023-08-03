package edu.ucsb.cs156.example.repositories;

import edu.ucsb.cs156.example.entities.UCSBDiningCommons;
import edu.ucsb.cs156.example.entities.UCSBDiningCommonsMenuItem;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface UCSBDiningCommonsMenuItemRepository extends CrudRepository<UCSBDiningCommonsMenuItem, Long>{
}
