package kr.megabrain.sirenorderserver.service;

import kr.megabrain.sirenorderserver.dto.ItemDto;
import kr.megabrain.sirenorderserver.entity.Item;
import kr.megabrain.sirenorderserver.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository; // 상수

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item addItem(ItemDto itemDto) {
        Item item = Item.createItem(itemDto);
        validationDuplicateItem(itemDto.getItemName());


        itemRepository.save(item);
        return item;
    }

    public void deleteItem(Long itemId) {
        Item findItem = itemRepository.findById(itemId)
                .orElseThrow(EntityNotFoundException::new);

        findItem.setIsSell(false);

        itemRepository.save(findItem);
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
