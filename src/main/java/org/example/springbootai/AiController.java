package org.example.springbootai;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ai")
@CrossOrigin(origins = "*")
public class AiController {
    private final AiService aiService;

    @PostMapping
    public MessageResponse createMessage(@RequestBody String message) {
        return aiService.createMessage(message);
    }

    @GetMapping
    public List<MessageEntity> getMessages() {
        return aiService.getMessages();
    }

    @GetMapping("/search")
    public List<MessageEntity> searchMessages(@RequestParam String searchQuery) {
        return aiService.searchMessages(searchQuery);
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Long id) {
        aiService.deleteMessage(id);
    }

    @PutMapping("/{id}")
    public void updateMessage(@PathVariable Long id, @RequestParam String message) {
        aiService.updateMessage(id, message);
    }

}