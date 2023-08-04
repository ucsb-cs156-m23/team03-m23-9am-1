package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.entities.UCSBDiningCommonsMenuItem;
import edu.ucsb.cs156.example.repositories.UCSBDiningCommonsMenuItemRepository;

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

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = UCSBDiningCommonsMenuItemController.class)
@Import(TestConfig.class)
public class UCSBDiningCommonsMenuItemControllerTests extends ControllerTestCase {

        @MockBean
        UCSBDiningCommonsMenuItemRepository ucsbDiningCommonsMenuItemRepository;

        @MockBean
        UserRepository userRepository;

        // Authorization tests for /api/ucsbdiningcommonsmenuitem/admin/all

        @Test
        public void logged_out_users_cannot_get_all() throws Exception {
                mockMvc.perform(get("/api/ucsbdiningcommonsmenuitem/all"))
                                .andExpect(status().is(403)); // logged out users can't get all
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_users_can_get_all() throws Exception {
                mockMvc.perform(get("/api/ucsbdiningcommonsmenuitem/all"))
                                .andExpect(status().is(200)); // logged
        }

        @Test
        public void logged_out_users_cannot_get_by_id() throws Exception {
                mockMvc.perform(get("/api/ucsbdiningcommonsmenuitem?id=1"))
                                .andExpect(status().is(403)); // logged out users can't get by id
        }


        // Authorization tests for /api/ucsbdiningcommonsmenuitem/put

        @Test
        public void logged_out_users_cannot_put() throws Exception {
                mockMvc.perform(post("/api/ucsbdiningcommonsmenuitem/put"))
                                .andExpect(status().is(403));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_regular_users_cannot_put() throws Exception {
                mockMvc.perform(post("/api/ucsbdiningcommonsmenuitem/put"))
                                .andExpect(status().is(403)); // only admins can put
        }

        // Authorization tests for /api/ucsbdiningcommonsmenuitem/delete

        @Test
        public void logged_out_users_cannot_delete() throws Exception {
                mockMvc.perform(post("/api/ucsbdiningcommonsmenuitem/delete"))
                                .andExpect(status().is(403));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_regular_users_cannot_delete() throws Exception {
                mockMvc.perform(post("/api/ucsbdiningcommonsmenuitem/delete"))
                                .andExpect(status().is(403)); // only admins can delete
        }


        // Authorization tests for /api/ucsbdiningcommonsmenuitem/post

        @Test
        public void logged_out_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/ucsbdiningcommonsmenuitem/post"))
                                .andExpect(status().is(403));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_regular_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/ucsbdiningcommonsmenuitem/post"))
                                .andExpect(status().is(403)); // only admins can post
        }

        // Tests with mocks for database actions

        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_exists() throws Exception {

                // arrange

                UCSBDiningCommonsMenuItem menuItem = UCSBDiningCommonsMenuItem.builder()
                                .id(1L)
                                .name("Baked Pesto Pasta with Chicken")
                                .diningCommonsCode("ortega")
                                .station("Entree Specials")
                                .build();

                when(ucsbDiningCommonsMenuItemRepository.findById(eq(1L))).thenReturn(Optional.of(menuItem));

                // act
                MvcResult response = mockMvc.perform(get("/api/ucsbdiningcommonsmenuitem?id=1"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findById(eq(1L));
                String expectedJson = mapper.writeValueAsString(menuItem);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_does_not_exist() throws Exception {

                // arrange

                when(ucsbDiningCommonsMenuItemRepository.findById(eq(1L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(get("/api/ucsbdiningcommonsmenuitem?id=1"))
                                .andExpect(status().isNotFound()).andReturn();

                // assert

                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findById(eq(1L));
                Map<String, Object> json = responseToJson(response);
                assertEquals("EntityNotFoundException", json.get("type"));
                assertEquals("UCSBDiningCommonsMenuItem with id 1 not found", json.get("message"));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_user_can_get_all_ucsbdiningcommonsmenuitems() throws Exception {

                // arrange

                UCSBDiningCommonsMenuItem menuItem1 = UCSBDiningCommonsMenuItem.builder()
                                .id(1L)
                                .name("Baked Pesto Pasta with Chicken")
                                .diningCommonsCode("ortega")
                                .station("Entree Specials")
                                .build();
                                
                UCSBDiningCommonsMenuItem menuItem2 = UCSBDiningCommonsMenuItem.builder()
                                .id(2L)
                                .name("Tofu Banh Mi Sandwich (v)")
                                .diningCommonsCode("ortega")
                                .station("Entree Specials")
                                .build();


                ArrayList<UCSBDiningCommonsMenuItem> expectedMenuItems = new ArrayList<>();
                expectedMenuItems.addAll(Arrays.asList(menuItem1, menuItem2));

                when(ucsbDiningCommonsMenuItemRepository.findAll()).thenReturn(expectedMenuItems);

                // act
                MvcResult response = mockMvc.perform(get("/api/ucsbdiningcommonsmenuitem/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findAll();
                String expectedJson = mapper.writeValueAsString(expectedMenuItems);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void an_admin_user_can_post_a_new_menu_item() throws Exception {
                // arrange

                UCSBDiningCommonsMenuItem menuItem = UCSBDiningCommonsMenuItem.builder()
                                .id(1L)
                                .name("Baked Pesto Pasta with Chicken")
                                .diningCommonsCode("ortega")
                                .station("Entree Specials")
                                .build();

                when(ucsbDiningCommonsMenuItemRepository.save(eq(menuItem))).thenReturn(menuItem);

                // act
                MvcResult response = mockMvc.perform(
                                post("/api/ucsbdiningcommonsmenuitem/post?id=1&name=Baked Pesto Pasta with Chicken&diningCommonsCode=ortega&station=Entree Specials")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).save(menuItem);
                String expectedJson = mapper.writeValueAsString(menuItem);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_can_delete_a_menu_item() throws Exception {
                // arrange

                UCSBDiningCommonsMenuItem menuItem = UCSBDiningCommonsMenuItem.builder()
                                .id(1L)
                                .name("Baked Pesto Pasta with Chicken")
                                .diningCommonsCode("ortega")
                                .station("Entree Specials")
                                .build();

                when(ucsbDiningCommonsMenuItemRepository.findById(eq(1L))).thenReturn(Optional.of(menuItem));

                // act
                MvcResult response = mockMvc.perform(
                                delete("/api/ucsbdiningcommonsmenuitem?id=1")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findById(1L);
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).delete(any());

                Map<String, Object> json = responseToJson(response);
                assertEquals("UCSBDiningCommonsMenuItem with id 1 deleted", json.get("message"));
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_tries_to_delete_non_existant_menu_item_and_gets_right_error_message()
                        throws Exception {
                // arrange

                when(ucsbDiningCommonsMenuItemRepository.findById(eq(1L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(
                                delete("/api/ucsbdiningcommonsmenuitem?id=1")
                                                .with(csrf()))
                                .andExpect(status().isNotFound()).andReturn();

                // assert
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findById(1L);
                Map<String, Object> json = responseToJson(response);
                assertEquals("UCSBDiningCommonsMenuItem with id 1 not found", json.get("message"));
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_can_edit_an_existing_menu_item() throws Exception {
                // arrange

                UCSBDiningCommonsMenuItem menuItemOrg = UCSBDiningCommonsMenuItem.builder()
                                .id(1L)
                                .name("Baked Pesto Pasta with Chicken")
                                .diningCommonsCode("ortega")
                                .station("Entree Specials")
                                .build();

                UCSBDiningCommonsMenuItem menuItemEdited = UCSBDiningCommonsMenuItem.builder()
                                .id(1L)
                                .name("Tofu Banh Mi Sandwich (v)")
                                .diningCommonsCode("carillo")
                                .station("Entrees")
                                .build();


                String requestBody = mapper.writeValueAsString(menuItemEdited);

                when(ucsbDiningCommonsMenuItemRepository.findById(eq(1L))).thenReturn(Optional.of(menuItemOrg));

                // act
                MvcResult response = mockMvc.perform(
                                put("/api/ucsbdiningcommonsmenuitem?id=1")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .characterEncoding("utf-8")
                                                .content(requestBody)
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findById(1L);
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).save(menuItemEdited); // should be saved with updated info
                String responseString = response.getResponse().getContentAsString();
                assertEquals(requestBody, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_cannot_edit_commons_that_does_not_exist() throws Exception {
                // arrange

                UCSBDiningCommonsMenuItem menuItemEdited = UCSBDiningCommonsMenuItem.builder()
                                .id(1L)
                                .name("Baked Pesto Pasta with Chicken")
                                .diningCommonsCode("ortega")
                                .station("Entree Specials")
                                .build();

                String requestBody = mapper.writeValueAsString(menuItemEdited);

                when(ucsbDiningCommonsMenuItemRepository.findById(eq(1L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(
                                put("/api/ucsbdiningcommonsmenuitem?id=1")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .characterEncoding("utf-8")
                                                .content(requestBody)
                                                .with(csrf()))
                                .andExpect(status().isNotFound()).andReturn();

                // assert
                verify(ucsbDiningCommonsMenuItemRepository, times(1)).findById(1L);
                Map<String, Object> json = responseToJson(response);
                assertEquals("UCSBDiningCommonsMenuItem with id 1 not found", json.get("message"));

        }
}
