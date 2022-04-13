from rest_framework import serializers


class SpellCheckInputSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=1000)


    def generate_output(self, processed):
        input_words = self.validated_data['text'].split(" ")
        output_words = processed.split(" ")
        if len(input_words) != len(output_words):
            raise serializers.ValidationError(code="system_error", detail="System could not generate data correctly")
        output = "<span class='normal'>"
        changed_class_name = "changed"
        error = 0
        for i in range(len(input_words)):
            if input_words[i] == output_words[i]:
                output += input_words[i] + " "
            else:
                error += 1
                output += f"<span class='{changed_class_name}'>{output_words[i]}</span> "

        return {
            "text": output + "</span>",
            "text_normal": processed,
            "error": error,
            "error_percentage": round(error/len(input_words)*100,2),
            "model": "Norvig"
        }