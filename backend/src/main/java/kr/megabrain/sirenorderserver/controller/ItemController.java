package kr.megabrain.sirenorderserver.controller;

import kr.megabrain.sirenorderserver.dto.ItemDto;
import kr.megabrain.sirenorderserver.entity.Item;
import kr.megabrain.sirenorderserver.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ItemController {

    @Autowired
    private final ItemService itemService;

    @PostMapping("/item/new")
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

    @GetMapping("/item")
    public ResponseEntity getAllItem() {

        List<Item> items = itemService.allItem();

        return new ResponseEntity(items, HttpStatus.OK);
    }

    @DeleteMapping("/item/{itemId}")
    public @ResponseBody ResponseEntity deleteItem(@PathVariable("itemId") Long itemId) {
        try {
            itemService.deleteItem(itemId);
        } catch (Exception e) {
            return new ResponseEntity("없는 상품입니다.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("삭제되었습니다", HttpStatus.OK);
    }
}
