document.addEventListener("DOMContentLoaded", () => {
	textarea = document.getElementById('in');
	submit_form = document.getElementById('submit-form');
	error = document.getElementById('error');
	error_percentage = document.getElementById('error_percentage');
	div_error_percentage = document.getElementById('div_error_percentage');
	textarea_stat = document.getElementById('count-data-left');
	processed_text = document.getElementById('processed_text');
	copy_button = document.getElementById('copy');
	left_textarea_div = document.querySelector('.left');
	output_stat = document.getElementById('count-data-right');
	stat_section = document.querySelector(".stat_section");

	submit_form.onclick = () => {
		output_stat.innerHTML = `0 söz, 0 xarakter`
		processed_text.innerHTML = "";
		stat_section.classList.add('d-none')
		if (textarea.value.length === 0) {
			alert("Please, insert a text!")
		}else {
			fetch("/api/v1/spellcheck", {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					text: textarea.value,
				})
			}).then(result => {
				if (result.status === 200) {
					result.text().then(resp => {
						obj = JSON.parse(resp);
						val = obj["text_normal"]
						words = val.split(" ").length
						output_stat.innerHTML = `${words} söz, ${val.length} xarakter`
						processed_text.innerHTML = obj["text"];
						stat_section.classList.remove('d-none');
						error.innerText = obj["error"]
						error_percentage.innerText = obj["error_percentage"] + "%"
						console.log(div_error_percentage)
						div_error_percentage.style.background = `linear-gradient(to right, #47C690 ${obj["error_percentage"]}%, #D9EDDF ${obj["error_percentage"]}%)`
						console.log(div_error_percentage)
					})
				}else{
					alert("Error Response: ", result)
				}
			});
		}
	}


	textarea.onblur = () => {
		left_textarea_div.style.borderColor = "rgba(229, 229, 229, 0.5)";
	}
	textarea.onfocus = () => {
		left_textarea_div.style.borderColor = "#47C690";
	}

	textarea.addEventListener("input", () => {
		val = textarea.value
		if (val != ""){
			words = val.split(" ").length
			textarea_stat.innerHTML = `${words} söz, ${val.length} xarakter`
		}else{
			textarea_stat.innerHTML = `0 söz, 0 xarakter`
		}
	})

	copy_button.onclick = ()  => {
		var input = document.getElementById("hidden_input_value");
		input.select();
		input.setSelectionRange(0, 99999); /* For mobile devices */
		navigator.clipboard.writeText(input.value)
	}
})