package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.entities.UCSBOrganization;
import edu.ucsb.cs156.example.repositories.UCSBOrganizationRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import java.time.LocalDateTime;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = UCSBOrganizationController.class)
@Import(TestConfig.class)
public class UCSBOrganizationControllerTests extends ControllerTestCase {

        @MockBean
        UCSBOrganizationRepository ucsbOrgRepository;

        @MockBean
        UserRepository userRepository;

        // Authorization tests for /api/ucsbdates/admin/all

        @Test
        public void logged_out_users_cannot_get_all() throws Exception {
                mockMvc.perform(get("/api/ucsborganization/all"))
                                .andExpect(status().is(403)); // logged out users can't get all
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_users_can_get_all() throws Exception {
                mockMvc.perform(get("/api/ucsborganization/all"))
                                .andExpect(status().is(200)); // logged
        }

        @Test
        public void logged_out_users_cannot_get_by_id() throws Exception {
                mockMvc.perform(get("/api/ucsborganization?id=7"))
                                .andExpect(status().is(403)); // logged out users can't get by id
        }

        // Authorization tests for /api/ucsbdates/post
        // (Perhaps should also have these for put and delete)

        @Test
        public void logged_out_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/ucsborganization/post"))
                                .andExpect(status().is(403));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_regular_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/ucsborganization/post"))
                                .andExpect(status().is(403)); // only admins can post
        }

        // // Tests with mocks for database actions

        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_exists() throws Exception {

                // arrange
                // LocalDateTime ldt = LocalDateTime.parse("2022-01-03T00:00:00");

                UCSBOrganization ucsbOrg = UCSBOrganization.builder()
                                .orgCode("ZPR")
                                .orgTranslationShort("Zeta Phi Rho")
                                .orgTranslation("Zeta Phi Rho")
                                .inactive(false)
                                .build();

                when(ucsbOrgRepository.findById(eq(7L))).thenReturn(Optional.of(ucsbOrg));

                // act
                MvcResult response = mockMvc.perform(get("/api/ucsborganization?id=7"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(ucsbOrgRepository, times(1)).findById(eq(7L));
                String expectedJson = mapper.writeValueAsString(ucsbOrg);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_does_not_exist() throws Exception {

                // arrange

                when(ucsbOrgRepository.findById(eq(7L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(get("/api/ucsborganization?id=7"))
                                .andExpect(status().isNotFound()).andReturn();

                // assert

                verify(ucsbOrgRepository, times(1)).findById(eq(7L));
                Map<String, Object> json = responseToJson(response);
                assertEquals("EntityNotFoundException", json.get("type"));
                assertEquals("UCSBOrganization with id 7 not found", json.get("message"));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_user_can_get_all_ucsborganization() throws Exception {

                // arrange
                // LocalDateTime ldt1 = LocalDateTime.parse("2022-01-03T00:00:00");

                UCSBOrganization ucsbOrg1 = UCSBOrganization.builder()
                                .orgCode("ZPR")
                                .orgTranslationShort("Zeta Phi Rho")
                                .orgTranslation("Zeta Phi Rho")
                                .inactive(false)
                                .build();

                // LocalDateTime ldt2 = LocalDateTime.parse("2022-03-11T00:00:00");

                UCSBOrganization ucsbOrg2 = UCSBOrganization.builder()
                                .orgCode("SKY")
                                .orgTranslationShort("SKYDIVING CLUB")
                                .orgTranslation("SKYDIVING CLUB AT UCSB")
                                .inactive(false)
                                .build();

                ArrayList<UCSBOrganization> expectedOrgs = new ArrayList<>();
                expectedOrgs.addAll(Arrays.asList(ucsbOrg1, ucsbOrg2));

                when(ucsbOrgRepository.findAll()).thenReturn(expectedOrgs);

                // act
                MvcResult response = mockMvc.perform(get("/api/ucsborganization/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(ucsbOrgRepository, times(1)).findAll();
                String expectedJson = mapper.writeValueAsString(expectedOrgs);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void an_admin_user_can_post_a_new_ucsborganization() throws Exception {
                // arrange

                // LocalDateTime ldt1 = LocalDateTime.parse("2022-01-03T00:00:00");

                UCSBOrganization ucsbOrg1 = UCSBOrganization.builder()
                                .orgCode("ZPR")
                                .orgTranslationShort("ZetaPhiRho")
                                .orgTranslation("ZetaPhiRho")
                                .inactive(true)
                                .build();

                when(ucsbOrgRepository.save(eq(ucsbOrg1))).thenReturn(ucsbOrg1);

                // act
                MvcResult response = mockMvc.perform(
                                post("/api/ucsborganization/post?orgCode=ZPR&orgTranslationShort=ZetaPhiRho&orgTranslation=ZetaPhiRho&inactive=true")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(ucsbOrgRepository, times(1)).save(ucsbOrg1);
                String expectedJson = mapper.writeValueAsString(ucsbOrg1);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_can_delete_an_organization() throws Exception {
                // arrange

                // LocalDateTime ldt1 = LocalDateTime.parse("2022-01-03T00:00:00");

                UCSBOrganization ucsbOrg1 = UCSBOrganization.builder()
                                .orgCode("ZPR")
                                .orgTranslationShort("ZetaPhiRho")
                                .orgTranslation("ZetaPhiRho")
                                .inactive(false)
                                .build();

                when(ucsbOrgRepository.findById(eq(15L))).thenReturn(Optional.of(ucsbOrg1));

                // act
                MvcResult response = mockMvc.perform(
                                delete("/api/ucsborganization?id=15")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(ucsbOrgRepository, times(1)).findById(15L);
                verify(ucsbOrgRepository, times(1)).delete(any());

                Map<String, Object> json = responseToJson(response);
                assertEquals("UCSBOrganization with id 15 deleted", json.get("message"));
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_tries_to_delete_non_existant_ucsborganization_and_gets_right_error_message()
                        throws Exception {
                // arrange

                when(ucsbOrgRepository.findById(eq(15L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(
                                delete("/api/ucsborganization?id=15")
                                                .with(csrf()))
                                .andExpect(status().isNotFound()).andReturn();

                // assert
                verify(ucsbOrgRepository, times(1)).findById(15L);
                Map<String, Object> json = responseToJson(response);
                assertEquals("UCSBOrganization with id 15 not found", json.get("message"));
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_can_edit_an_existing_ucsborganization() throws Exception {
                // arrange

                // LocalDateTime ldt1 = LocalDateTime.parse("2022-01-03T00:00:00");
                // LocalDateTime ldt2 = LocalDateTime.parse("2023-01-03T00:00:00");

                UCSBOrganization ucsbOrg1 = UCSBOrganization.builder()
                                .orgCode("ZPL")
                                .orgTranslationShort("ZRho")
                                .orgTranslation("ZetaPhiRo")
                                .inactive(true)
                                .build();

                UCSBOrganization ucsbOrg2 = UCSBOrganization.builder()
                                .orgCode("ZPR")
                                .orgTranslationShort("ZetaPhiRho")
                                .orgTranslation("ZetaPhiRho")
                                .inactive(false)
                                .build();

                String requestBody = mapper.writeValueAsString(ucsbOrg2);

                when(ucsbOrgRepository.findById(eq(67L))).thenReturn(Optional.of(ucsbOrg1));

                // act
                MvcResult response = mockMvc.perform(
                                put("/api/ucsborganization?id=67")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .characterEncoding("utf-8")
                                                .content(requestBody)
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(ucsbOrgRepository, times(1)).findById(67L);
                verify(ucsbOrgRepository, times(1)).save(ucsbOrg2); // should be saved with correct user
                String responseString = response.getResponse().getContentAsString();
                assertEquals(requestBody, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_cannot_edit_ucsborganization_that_does_not_exist() throws Exception {
                // arrange

                // LocalDateTime ldt1 = LocalDateTime.parse("2022-01-03T00:00:00");

                UCSBOrganization ucsbOrg1 = UCSBOrganization.builder()
                                .orgCode("ZPR")
                                .orgTranslationShort("ZRho")
                                .orgTranslation("ZetaPhiRho")
                                .inactive(false)
                                .build();

                String requestBody = mapper.writeValueAsString(ucsbOrg1);

                when(ucsbOrgRepository.findById(eq(67L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(
                                put("/api/ucsborganization?id=67")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .characterEncoding("utf-8")
                                                .content(requestBody)
                                                .with(csrf()))
                                .andExpect(status().isNotFound()).andReturn();

                // assert
                verify(ucsbOrgRepository, times(1)).findById(67L);
                Map<String, Object> json = responseToJson(response);
                assertEquals("UCSBOrganization with id 67 not found", json.get("message"));

        }
}
