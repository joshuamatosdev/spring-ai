package org.example.springbootai;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.client.AiClient;
import org.springframework.ai.client.AiResponse;
import org.springframework.ai.prompt.Prompt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AiService {
    private final AiClient aiClient;
    private final MessageRepository messageRepository;

    public MessageResponse createMessage(String message) {
        MessageEntity messageEntity = new MessageEntity();
        var generateMessage = aiClient.generate(message);
        messageEntity.setMessage(generateMessage);
        messageRepository.save(messageEntity);
        return new MessageResponse(generateMessage);
    }

    public List<MessageEntity> getMessages() {
        return messageRepository.findAll();
    }

    public List<MessageEntity> searchMessages(String searchQuery) {
        return messageRepository.findByMessageContainingIgnoreCase(searchQuery);
    }
    
    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }
    
    public void updateMessage(Long id, String message) {
        MessageEntity messageEntity = messageRepository.findById(id).orElseThrow();
        messageEntity.setMessage(message);
        messageRepository.save(messageEntity);
    }
}
