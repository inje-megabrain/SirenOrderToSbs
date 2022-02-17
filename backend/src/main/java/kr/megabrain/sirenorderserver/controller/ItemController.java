package kr.megabrain.sirenorderserver.controller;

import kr.megabrain.sirenorderserver.dto.ItemDto;
import kr.megabrain.sirenorderserver.entity.Item;
import kr.megabrain.sirenorderserver.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/api/item")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping("/new")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public @ResponseBody
    ResponseEntity addItem(@Valid @RequestBody ItemDto itemDto) {
        Item savedItem;
        try {
            savedItem = itemService.addItem(itemDto);
        } catch (IllegalStateException e) {
            return new ResponseEntity("이미 있는 상품입니다.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(savedItem, HttpStatus.OK);
    }

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity getAllItem() {

        List<Item> items = itemService.allItem();

        return new ResponseEntity(items, HttpStatus.OK);
    }

    @DeleteMapping("/{itemId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public @ResponseBody ResponseEntity deleteItem(@PathVariable("itemId") Long itemId) {
        try {
            itemService.deleteItem(itemId);
        } catch (Exception e) {
            return new ResponseEntity("없는 상품입니다.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("삭제되었습니다", HttpStatus.OK);
    }
}
