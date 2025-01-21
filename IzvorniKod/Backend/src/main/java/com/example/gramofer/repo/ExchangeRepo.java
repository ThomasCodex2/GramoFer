package com.example.gramofer.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.gramofer.model.Exchange;
import com.example.gramofer.model.UserAccount;

@Repository
public interface ExchangeRepo extends JpaRepository<Exchange, Integer> {

    @Query("SELECT e FROM Exchange e WHERE e.user = :user AND e.status = '0'")
    List<Exchange> findAllByUserAndStatusZero(@Param("user") UserAccount user);

    @Query("SELECT e FROM Exchange e WHERE e.isOfferingUser = :isOfferingUser AND e.status = '0'")
    List<Exchange> findAllByIsOfferingUserAndStatusZero(@Param("isOfferingUser") UserAccount isOfferingUser);

    @Query("SELECT e FROM Exchange e WHERE e.user = :user AND e.status = '1'")
    List<Exchange> findAllByUserAndStatusOne(@Param("user") UserAccount user);

    @Query("SELECT e FROM Exchange e WHERE e.isOfferingUser = :isOfferingUser AND e.status = '1'")
    List<Exchange> findAllByIsOfferingUserAndStatusOne(@Param("isOfferingUser") UserAccount isOfferingUser);
}
