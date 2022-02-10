package kr.megabrain.sirenorderserver.service;

import kr.megabrain.sirenorderserver.dto.ItemDto;
import kr.megabrain.sirenorderserver.entity.Item;
import kr.megabrain.sirenorderserver.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public Item addItem(ItemDto itemDto) {
        Item item = Item.createItem(itemDto);
        validationDuplicateItem(itemDto.getItemName());

        itemRepository.save(item);
        return item;
    }

    public void deleteItem(Long itemId) {
        itemRepository.deleteById(itemId);
    }

    public void validationDuplicateItem(String itemName) {
        Item item = itemRepository.findByItemName(itemName);
        if (item != null) {
            throw new IllegalStateException("이미 있는 상품입니다.");
        }
    }

    public List<Item> allItem(){
        List<Item> items = itemRepository.findAll();
        return items;
    }
}
